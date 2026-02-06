🚀 Realtime Chat App — MERN + Socket.IO

A full-stack real-time chat application built using the MERN stack with Socket.IO for instant messaging — no page refresh, true live updates.

This project goes beyond basic CRUD and focuses on real-time communication, authentication, and scalable architecture, closely resembling production-level chat systems.

✨ Features

🔴 Real-time messaging with Socket.IO

👥 Online users tracking

🔐 JWT authentication with cookies

🛡️ Protected routes

💬 One-to-one conversations

🎨 Clean & responsive UI using DaisyUI

⚡ Instant UI updates (no refresh)

🧠 State management with Zustand

🗂️ Scalable backend architecture

🛠️ Tech Stack
Frontend

React + Vite

Tailwind CSS

DaisyUI

Zustand

Axios

Socket.IO Client

Backend

Node.js

Express.js

MongoDB (Atlas)

Socket.IO

JWT Authentication

Cookie-Parser

CORS

dotenv

📸 Demo

🎥 Video Demo:
👉 (Add your LinkedIn video link or GitHub video here)

🧩 Architecture Highlights

Socket lifecycle managed using React Context + refs

Separate REST APIs and Socket server

Real-time events emitted only when users are online

Clean separation of controllers, routes, hooks, context, and state

Handles edge cases like reconnects, refreshes, and user logout

⚙️ Environment Variables
Backend (.env)
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🚀 How to Run Locally
Clone the repo
git clone https://github.com/vips725/realtime-chat-app-socketio.git
cd realtime-chat-app-socketio

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend/vite-project
npm install
npm run dev

📚 What I Learned

Implementing real-time systems

Managing Socket.IO connections correctly

Avoiding common React useEffect pitfalls

Debugging production-like issues

Structuring a scalable MERN application

🙌 Feedback

I’d love feedback on:

Architecture

Real-time handling

State management choices
