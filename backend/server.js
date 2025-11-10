import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ✅ default import, not destructured

import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://full-stack-task-tracker-nine.vercel.app",
];

// ✅ CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ API Routes
app.use("/api/tasks", taskRoutes);

// ✅ Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
