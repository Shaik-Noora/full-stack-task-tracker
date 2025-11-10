import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import InsightsPanel from "./components/InsightsPanel";
import { API_BASE } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (query = {}) => {
    try {
      const params = new URLSearchParams(query).toString();
      const url = `${API_BASE}/tasks${params ? `?${params}` : ""}`;
      const res = await axios.get(url);
      setTasks(res.data.data || []);
    } catch (err) {
      console.error("Fetch tasks error:", err);
    }
  };

  const fetchInsights = async () => {
    try {
      const res = await axios.get(`${API_BASE}/insights`);
      setInsights(res.data.data);
    } catch (err) {
      console.error("Fetch insights error:", err);
    }
  };

  useEffect(() => {
    const boot = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchInsights()]);
      setLoading(false);
    };
    boot();
  }, []);

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([fetchTasks(), fetchInsights()]);
    setLoading(false);
  };

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">
          <div className="logo">🧭</div>
          <div>
            <h1>TaskTracker</h1>
            <p className="subtitle">Smart Insights • Clean UI</p>
          </div>
        </div>
        <div className="meta">
          <small>{new Date().toLocaleDateString()}</small>
        </div>
      </header>

      <main className="container">
        <section className="left-col">
          <TaskForm onAdded={refreshAll} />
          <InsightsPanel insights={insights} />
        </section>

        <section className="right-col">
          <TaskList
            tasks={tasks}
            loading={loading}
            onRefresh={refreshAll}
            onFilter={(q) => fetchTasks(q)}
          />
        </section>
      </main>

      <footer className="footer">
        <small>Built with ❤️ • Connects to {API_BASE}</small>
      </footer>
    </div>
  );
}
