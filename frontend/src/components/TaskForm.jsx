import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";

const empty = { title: "", description: "", priority: "Low", dueDate: "" };

export default function TaskForm({ onAdded }) {
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.dueDate) return setError("Please select a due date.");
    try {
      setSubmitting(true);
      await axios.post(`${API_BASE}/tasks`, form);
      setForm(empty);
      onAdded?.();
    } catch (err) {
      console.error(err);
      setError("Failed to add task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card form-card" onSubmit={submit}>
      <div className="form-head">
        <h2>Add a new task</h2>
        <small className="muted">Quick capture — keep it short</small>
      </div>

      <input
        name="title"
        value={form.title}
        onChange={change}
        placeholder="Title (e.g., Fix login bug)"
        className="input"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={change}
        placeholder="Short description (optional)"
        className="textarea"
      />
      <div className="row">
        <select name="priority" value={form.priority} onChange={change} className="input half">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={change}
          className="input half"
        />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="actions">
        <button className="btn primary" type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Task"}
        </button>
        <button
          type="button"
          className="btn ghost"
          onClick={() => setForm(empty)}
          disabled={submitting}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
