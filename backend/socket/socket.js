// socket/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // your frontend
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;

  // ✅ Only store if userId is valid
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log("User registered:", userId);
  }

  // Send updated online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId && userId !== "undefined") {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

// Helper
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { app, io, server };