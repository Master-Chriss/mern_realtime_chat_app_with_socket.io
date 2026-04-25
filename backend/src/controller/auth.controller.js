import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
import User from '../models/user.model.js';



export const signup = async (req, res) => {
  const {fullName, email, password} = req.body;
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({messsage: "All fields are required"});
    }
    
    if(password.length < 6) {
      return res.status(400).json({messsage: "Password must be at least 6 characters long"});
    }

    const userExist = await User.findOne({email});
    if(userExist) {
      return res.status(400).json({messsage: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    if(newUser) {
      // Generate the token
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      });
    } else {
      return res.status(400).json({messsage: "Invalid user data. User not created"});
    }
  } catch (error) {
    console.log("Error in signup controller", error.messsage);
    return res.status(500).json({messsage: "Internal server error"});
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});

    if(!user) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    // Generate the token
    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log("Error in login controller", error.messsage);
    return res.status(500).json({messsage: "Internal server error"});
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', {maxAge: 0});
    res.status(200).json({message: "Logout successful"});
  } catch (error) {
    console.log("Error in logout controller", error.messsage);
    return res.status(500).json({messsage: "Internal server error"});
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {profilePic} = req.body;
    
      if(!profilePic) {
        return res.status(400).json({message: "Profile picture is required"});
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(userId, {
        profilePic: uploadResponse.secure_url,
      }, {new: true});
      return res.status(200).json(updatedUser);
    
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    return res.status(500).json({message: "Internal server error"});
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(500).json({message: "Internal server error"});
  }
};
