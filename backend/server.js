import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow all your deployment origins (local + vercel)
const allowedOrigins = [
  "http://localhost:5174",
  "https://full-stack-task-tracker-4i7m-git-main-nooras-projects-7bc87cae.vercel.app",
  "https://full-stack-task-tracker-4i7m-frbylh76p-nooras-projects-7bc87cae.vercel.app",
  "https://full-stack-task-tracker-ou1m.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked CORS request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
