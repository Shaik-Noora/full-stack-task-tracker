import express from "express";
import { addTask, getTasks, updateTask, getInsights } from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", addTask);
router.get("/tasks", getTasks);
router.patch("/tasks/:id", updateTask);
router.get("/insights", getInsights);

export default router;
