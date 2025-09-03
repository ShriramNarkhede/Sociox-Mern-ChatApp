import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Ensure Express knows it's behind a proxy in production (for secure cookies)
if (process.env.NODE_ENV !== "development") {
  app.set("trust proxy", 1);
}

// Debug: Log environment variables
console.log("Environment check:");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Parse allowed origins
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173").split(",");
console.log("Allowed CORS origins:", allowedOrigins);

// Ensure CORS headers are applied even when body parsing fails
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// Harden CORS: ensure headers are present on every response and short-circuit preflights
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.header("Access-Control-Allow-Origin", requestOrigin);
    res.header("Vary", "Origin");
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Increase payload limits for JSON and URL-encoded forms
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("server is running on PORT:" + PORT);
      console.log("CORS configured for origins:", allowedOrigins);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB error:", err?.message || err);
    process.exit(1);
  });
