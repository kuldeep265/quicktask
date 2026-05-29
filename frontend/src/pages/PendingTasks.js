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
    <section className="task-section" aria-labelledby="pending-heading">
      <h2 id="pending-heading" className="section-title">
        Pending tasks
      </h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          aria-label="New task title"
        />
        <button type="button" onClick={addTask} className="btn-add">
          Add
        </button>
      </div>

      {loading ? (
        <p className="empty-state">Loading tasks...</p>
      ) : (
        <>
          {tasks.length > 0 && (
            <p className="task-summary">
              {tasks.length} pending {tasks.length === 1 ? "task" : "tasks"}
            </p>
          )}

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id}>
                <span>{task.title}</span>
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

          {tasks.length === 0 && (
            <p className="empty-state">
              No pending tasks. Add one above or check your{" "}
              <Link to="/completed">completed</Link> list.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default PendingTasks;
