import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loogedInUseId = req.user._id;
    const filteredUsers = await User.find({_id: {$ne: loogedInUseId}}).select("-password");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message);
    return res.status(500).json({message: "Internal server error"});
  }
};

export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const myId = req.user._id;
     const messages = await Message.find({
       $or: [
         {senderId: userToChatId, receiverId: myId},
         {senderId: myId, receiverId: userToChatId}
       ]
     });
     return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    return res.status(500).json({message: "Internal server error"});
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {text, image} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id; 
    
    let imageUrl;
    if(image) {
      // Upload the base64 image to the cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if(receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }


    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error);
    return res.status(500).json({
      message:
        error?.message ||
        error?.error?.message ||
        "Failed to send message",
    });
  }
};
