import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// ✅ Universal CORS — allows every domain, every method
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], credentials: true }));

app.use(express.json());

// ✅ Routes
app.use("/api", taskRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
