import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// ✅ Fix: Allow both localhost (for dev) and Vercel domains
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://full-stack-task-tracker-git-main-nooras-projects-7bc87cae.vercel.app",
    "https://full-stack-task-tracker-3uxzjiur9-nooras-projects-7bc87cae.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api", taskRoutes);

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
