import React, { useMemo, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString();
}

export default function TaskList({ tasks = [], loading, onRefresh, onFilter }) {
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editPriority, setEditPriority] = useState("");

  const applyFilter = () => {
    const q = {};
    if (statusFilter) q.status = statusFilter;
    if (priorityFilter) q.priority = priorityFilter;
    onFilter?.(q);
  };

  const clearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    onFilter?.({});
  };

  const toggleDone = async (id, current) => {
    try {
      await axios.patch(`${API_BASE}/tasks/${id}`, { status: current === "Completed" ? "Pending" : "Completed" });
      onRefresh?.();
    } catch (err) {
      console.error(err);
      alert("Could not update task");
    }
  };

  const savePriority = async (id) => {
    try {
      await axios.patch(`${API_BASE}/tasks/${id}`, { priority: editPriority });
      setEditingId(null);
      onRefresh?.();
    } catch (err) {
      console.error(err);
      alert("Could not update priority");
    }
  };

  const visible = useMemo(() => {
    const copy = [...tasks];
    copy.sort((a, b) => {
      const ad = new Date(a.dueDate || 0).getTime();
      const bd = new Date(b.dueDate || 0).getTime();
      return sortAsc ? ad - bd : bd - ad;
    });
    return copy;
  }, [tasks, sortAsc]);

  return (
    <div className="card list-card">
      <div className="list-head">
        <h2>Tasks</h2>
        <div className="controls">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select">
            <option value="">All status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="select">
            <option value="">All priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button className="btn ghost small" onClick={applyFilter}>Apply</button>
          <button className="btn ghost small" onClick={clearFilters}>Clear</button>

          <button className="btn small" onClick={() => setSortAsc((s) => !s)}>
            Sort: {sortAsc ? "Soon → Later" : "Later → Soon"}
          </button>
        </div>
      </div>

      {loading ? <div className="loading">Loading tasks...</div> : null}

      {!loading && visible.length === 0 && <div className="muted">No tasks found — add one on the left.</div>}

      <ul className="task-list">
        {visible.map((t) => (
          <li key={t._id} className={`task-row ${t.status === "Completed" ? "done" : ""}`}>
            <div className="task-main">
              <div className="task-title">
                <strong>{t.title}</strong>
                <div className="meta small muted">
                  <span>{t.status}</span> • <span>{t.priority} priority</span> • <span>Due {formatDate(t.dueDate)}</span>
                </div>
                <p className="desc muted">{t.description}</p>
              </div>
            </div>

            <div className="task-actions">
              <button className="btn tiny" onClick={() => toggleDone(t._id, t.status)}>
                {t.status === "Completed" ? "Undo" : "Done"}
              </button>

              {editingId === t._id ? (
                <>
                  <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} className="select small">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                  <button className="btn tiny" onClick={() => savePriority(t._id)}>Save</button>
                  <button className="btn ghost tiny" onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn ghost tiny" onClick={() => { setEditingId(t._id); setEditPriority(t.priority); }}>Edit</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
