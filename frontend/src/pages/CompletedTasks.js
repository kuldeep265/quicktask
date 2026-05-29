import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import TasksByDate from "../components/TasksByDate";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks", { params: { status: "completed" } });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const reopenTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, { completed: false });
      fetchTasks();
    } catch (error) {
      console.error("Error reopening task:", error);
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
    <div className="page page-completed">
      <header className="page-hero page-hero-completed">
        <div className="page-hero-content">
          <p className="page-eyebrow">Achievements</p>
          <h1>Completed tasks</h1>
          <p className="page-lead">
            Finished work grouped by the date it was due. Reopen a task if you need to revisit it.
          </p>
        </div>
        <div className="stat-pill stat-pill-completed" aria-live="polite">
          <span className="stat-value">{loading ? "—" : tasks.length}</span>
          <span className="stat-label">done</span>
        </div>
      </header>

      <div className="page-body">
        {loading ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <p>Loading your completed tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state empty-state-success">
            <span className="empty-icon" aria-hidden="true">◎</span>
            <p>No completed tasks yet.</p>
            <p className="empty-hint">
              Finish something on your <Link to="/pending">pending</Link> board first.
            </p>
          </div>
        ) : (
          <TasksByDate
            tasks={tasks}
            variant="completed"
            onReopen={reopenTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default CompletedTasks;
