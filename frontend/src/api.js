// Simple central API base; change if your backend runs elsewhere
// src/api.js
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Fetch all tasks
export const fetchTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

// Add a new task
export const addTask = async (task) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

// Delete a task
export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
};

// Fetch dashboard insights (if applicable)
export const fetchInsights = async () => {
  const res = await fetch(`${API_BASE}/insights`);
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
};