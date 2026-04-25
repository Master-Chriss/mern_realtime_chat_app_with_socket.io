# 💬 Real-Time MERN Chat App

🚀 A full-stack real-time chat application built with the MERN stack, designed for fast, secure, and seamless communication.

---

## 🌐 Live Demo

👉 https://your-live-demo-link.com

---

## 📸 Screenshots

| Chat UI                                      | Login Page                                    |
| -------------------------------------------- | --------------------------------------------- |
| ![Chat](https://via.placeholder.com/400x250) | ![Login](https://via.placeholder.com/400x250) |

---

## ✨ Features

* 🔐 Authentication (JWT-based)
* 💬 Real-time messaging (Socket.io)
* 🟢 Online/offline status
* ⚡ Instant updates (no refresh)
* 📱 Fully responsive design
* 🔒 Secure password hashing
* 🌍 REST API integration

---

## 🧰 Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* Axios
* Socket.io-client

**Backend**

* Node.js
* Express.js
* Socket.io
* JWT
* bcrypt

**Database**

* MongoDB (Atlas)

---

## 📁 Project Structure

```
backend/        → Express backend
frontend/        → React frontend

```

---

## ⚙️ Setup Instructions

### 1. Clone repo

```bash
git clone https://github.com/Master-Chriss/mern_realtime_chat_app_with_socket.io.git
cd /mern_realtime_chat_app_with_socket.io
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

Run:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd client
npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:5001
```

Run:

```bash
npm run dev
```

---

## 🚀 Deployment

* Frontend → Vercel 
* Backend → Render 
* Database → MongoDB Atlas

✔ Update API URLs
✔ Configure CORS
✔ Add environment variables

---

## 🔌 API Overview

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users
GET    /api/messages/:id
POST   /api/messages
```

---

## 🧠 Future Improvements

* 📎 File sharing
* 👥 Group chats
* ✏️ Edit/delete messages
* 🔔 Notifications
* 🌙 Dark mode

---

## 🤝 Contributing

Pull requests are welcome. Open an issue first for major changes.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Master Chriss

---

## ⭐ Show Support

If you found this helpful, give it a ⭐ and share it!
