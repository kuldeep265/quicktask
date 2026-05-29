import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import TasksByDate from "../components/TasksByDate";
import { todayInputValue } from "../utils/dateUtils";

function OverdueTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDueDate, setNewDueDate] = useState(() => todayInputValue());

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks", { params: { status: "expired" } });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching overdue tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const completeTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, { completed: true });
      setRescheduleId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setRescheduleId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleRescheduleClick = (task) => {
    setRescheduleId(task._id);
    setNewDueDate(todayInputValue());
  };

  const confirmReschedule = async () => {
    if (!rescheduleId) return;
    try {
      await api.put(`/tasks/${rescheduleId}`, { dueDate: newDueDate });
      setRescheduleId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error rescheduling task:", error);
    }
  };

  return (
    <div className="page page-overdue">
      <header className="page-hero page-hero-overdue">
        <div className="page-hero-content">
          <p className="page-eyebrow">Missed deadlines</p>
          <h1>Overdue tasks</h1>
          <p className="page-lead">
            These tasks passed their due date without being completed. Reschedule or mark them done.
          </p>
        </div>
        <div className="stat-pill stat-pill-overdue" aria-live="polite">
          <span className="stat-value">{loading ? "—" : tasks.length}</span>
          <span className="stat-label">overdue</span>
        </div>
      </header>

      <div className="page-body">
        {rescheduleId && (
          <div className="reschedule-bar" role="region" aria-label="Reschedule task">
            <p>Pick a new due date — the task will return to Pending.</p>
            <div className="reschedule-actions">
              <input
                type="date"
                value={newDueDate}
                min={todayInputValue()}
                onChange={(e) => setNewDueDate(e.target.value)}
                aria-label="New due date"
              />
              <button type="button" className="btn-add" onClick={confirmReschedule}>
                Save date
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setRescheduleId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">!</span>
            <p>Loading overdue tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state empty-state-success">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <p>No overdue tasks — great job staying on schedule.</p>
            <p className="empty-hint">
              View upcoming work on your <Link to="/pending">pending</Link> board.
            </p>
          </div>
        ) : (
          <TasksByDate
            tasks={tasks}
            variant="expired"
            onComplete={completeTask}
            onDelete={deleteTask}
            onReschedule={handleRescheduleClick}
          />
        )}
      </div>
    </div>
  );
}

export default OverdueTasks;
