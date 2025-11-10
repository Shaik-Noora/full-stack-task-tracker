import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "https://full-stack-task-tracker.vercel.app",
}));
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
