import Task from "../models/Task.js";

// POST /tasks → Add new task
export const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /tasks → List all tasks (supports filter)
export const getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ dueDate: 1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PATCH /tasks/:id → Update status or priority
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /insights → Generate analytics
export const getInsights = async (req, res) => {
  try {
    const tasks = await Task.find();
    const total = tasks.length;

    const byPriority = tasks.reduce((acc, t) => {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, {});

    const dueSoon = tasks.filter(
      (t) => (new Date(t.dueDate) - Date.now()) / (1000 * 60 * 60 * 24) <= 3
    ).length;

    const dominant =
      Object.entries(byPriority).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

    const message = `You have ${total} tasks — most are ${dominant} priority. ${
      dueSoon > 0 ? `${dueSoon} due soon.` : ""
    }`;

    res.json({
      success: true,
      data: { total, byPriority, dueSoon, message },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
