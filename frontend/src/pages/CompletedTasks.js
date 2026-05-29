import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks", { params: { completed: "true" } });
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
    <section className="task-section" aria-labelledby="completed-heading">
      <h2 id="completed-heading" className="section-title">
        Completed tasks
      </h2>

      {loading ? (
        <p className="empty-state">Loading tasks...</p>
      ) : (
        <>
          {tasks.length > 0 && (
            <p className="task-summary task-summary-done">
              {tasks.length} completed {tasks.length === 1 ? "task" : "tasks"}
            </p>
          )}

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="completed">
                <span>{task.title}</span>
                <div className="task-actions">
                  <button
                    type="button"
                    className="btn-status is-done"
                    onClick={() => reopenTask(task._id)}
                  >
                    Mark pending
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
              No completed tasks yet. Finish something on your{" "}
              <Link to="/pending">pending</Link> list.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default CompletedTasks;
