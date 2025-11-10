# Design Notes

## 🧱 Database Schema
- **Collection:** `tasks`
- **Fields:**
  - `title` (String, required)
  - `description` (String)
  - `priority` (Enum: Low, Medium, High)
  - `status` (Enum: Pending, In Progress, Completed)
  - `dueDate` (Date)
  - `createdAt` (Date, default: now)

Indexes:
- Indexed on `dueDate` and `priority` for quick filtering and sorting.

---

## ⚙️ Backend Logic
- **Express.js** used for routing and middleware.
- **Mongoose ORM** handles data validation and schema enforcement.
- Insights endpoint aggregates task data to generate workload summaries.

---

## 💡 Smart Insights Logic
- Count tasks grouped by priority.
- Detect busiest day based on due dates.
- Compose readable summaries like:
  > “You have 8 open tasks — most are High priority and due within 2 days.”

---

## 🌐 Frontend Architecture
- **React + Axios:** API communication.
- **Components:**
  - `TaskForm.jsx` → create tasks
  - `TaskList.jsx` → view & update tasks
  - `InsightsPanel.jsx` → display summary

---

## 🔮 Future Improvements
- Add user authentication (multi-user task tracking).
- Add notifications for upcoming due tasks.
- Integrate charts in the Insights panel.

---

## ✅ Design Difficulty: 6.5 / 10
Moderate — requires backend CRUD, database modeling, and frontend state management but manageable for a full-stack beginner.
