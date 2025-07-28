// server.js

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from correct path (backend folder)
dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// ✅ Static frontend build (if using Vite/React)
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

// ✅ Connect to DB first, then start server
connectToMongoDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("✅ MongoDB connected");
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });
