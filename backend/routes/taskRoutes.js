import express from "express";
import {
  addTask,
  getTasks,
  updateTask,
  getInsights,
} from "../controllers/taskController.js";

const router = express.Router();

// ✅ Corrected: no extra '/tasks' prefix
router.post("/", addTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);
router.get("/insights", getInsights);

export default router;
