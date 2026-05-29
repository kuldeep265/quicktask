import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import TasksByDate from "../components/TasksByDate";
import { todayInputValue } from "../utils/dateUtils";

function PendingTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(() => todayInputValue());
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks", { params: { status: "pending" } });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await api.post("/tasks/add", { title: title.trim(), dueDate });
      setTitle("");
      setDueDate(todayInputValue());
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, { completed: true });
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="page page-pending">
      <header className="page-hero page-hero-pending">
        <div className="page-hero-content">
          <p className="page-eyebrow">Your inbox</p>
          <h1>Pending tasks</h1>
          <p className="page-lead">
            Tasks are grouped by due date. Finish them on time so they don&apos;t move to Overdue.
          </p>
        </div>
        <div className="stat-pill stat-pill-pending" aria-live="polite">
          <span className="stat-value">{loading ? "—" : tasks.length}</span>
          <span className="stat-label">open</span>
        </div>
      </header>

      <div className="page-body">
        <div className="composer-card">
          <label className="composer-label" htmlFor="new-task">
            Add a new task
          </label>
          <div className="composer-row">
            <input
              id="new-task"
              type="text"
              placeholder="What do you need to do?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
          </div>
          <div className="composer-meta">
            <label className="due-date-field" htmlFor="task-due-date">
              Complete by
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                min={todayInputValue()}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <button type="button" onClick={addTask} className="btn-add">
              Add task
            </button>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">◷</span>
            <p>Loading your pending tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✦</span>
            <p>Nothing pending right now — you&apos;re all clear.</p>
            <p className="empty-hint">
              Add a task above, or check <Link to="/overdue">overdue</Link> and{" "}
              <Link to="/completed">completed</Link> tasks.
            </p>
          </div>
        ) : (
          <TasksByDate
            tasks={tasks}
            variant="pending"
            onComplete={completeTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default PendingTasks;
