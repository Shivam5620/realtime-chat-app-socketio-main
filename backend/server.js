import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // <-- import cors

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectToMongoDB from "./db/connecttoMongoDB.js";
import { app , server} from "./socket/socket.js";


dotenv.config();

const PORT = process.env.PORT;

// 1️⃣ Enable CORS for all origins (or restrict to frontend if needed)
app.use(cors({
  origin: "http://localhost:5173", // your React frontend
  credentials: true,               // if you use cookies
}));

// 2️⃣ Parse JSON & cookies
app.use(express.json());
app.use(cookieParser());

// 3️⃣ Test route
app.get("/", (req, res) => {
  res.send("API working");
});

// 4️⃣ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// 5️⃣ Start server & connect to DB
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`SERVER RUNNING AT PORT ${PORT}`);
});
