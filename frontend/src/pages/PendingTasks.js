import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function PendingTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks", { params: { completed: "false" } });
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
      await api.post("/tasks/add", { title: title.trim() });
      setTitle("");
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
            Capture what needs doing next. Mark items done when you finish them.
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
          <div className="input-section">
            <input
              id="new-task"
              type="text"
              placeholder="What do you need to do?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
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
              Add a task above, or browse your{" "}
              <Link to="/completed">completed</Link> work.
            </p>
          </div>
        ) : (
          <ul className="task-grid" aria-label="Pending tasks">
            {tasks.map((task) => (
              <li key={task._id} className="task-card task-card-pending">
                <div className="task-card-body">
                  <span className="task-dot" aria-hidden="true" />
                  <p className="task-title">{task.title}</p>
                </div>
                <div className="task-actions">
                  <button
                    type="button"
                    className="btn-status is-pending"
                    onClick={() => completeTask(task._id)}
                  >
                    Mark done
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PendingTasks;
