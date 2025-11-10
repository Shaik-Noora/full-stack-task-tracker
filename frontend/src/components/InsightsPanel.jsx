import React from "react";

export default function InsightsPanel({ insights }) {
  if (!insights) return <div className="card info-card">Loading insights…</div>;

  const { total, byPriority = {}, dueSoon, message } = insights;

  return (
    <div className="card info-card">
      <h3>Smart Insights</h3>
      <p className="insight-message"> {message} </p>

      <div className="insight-grid">
        <div className="insight-item">
          <div className="big">{total}</div>
          <div className="muted">Total tasks</div>
        </div>

        <div className="insight-item">
          <div className="big">{byPriority.High || 0}</div>
          <div className="muted">High</div>
        </div>

        <div className="insight-item">
          <div className="big">{byPriority.Medium || 0}</div>
          <div className="muted">Medium</div>
        </div>

        <div className="insight-item">
          <div className="big">{byPriority.Low || 0}</div>
          <div className="muted">Low</div>
        </div>

        <div className="insight-item">
          <div className="big">{dueSoon}</div>
          <div className="muted">Due soon</div>
        </div>
      </div>
    </div>
  );
}
