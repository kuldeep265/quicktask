import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5002";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");



  // GET TASKS
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };



  // ADD TASK
  const addTask = async () => {
    if(title === "") return;
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/add`, { title: title });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };



  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  // UPDATE TASK
  const completeTask = async (id, completed) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };



  useEffect(() => {

    fetchTasks();

  }, []);



  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (

    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>QuickTask</h1>
          <p className="app-subtitle">Stay organized, one task at a time</p>
        </header>

        <div className="input-section">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="New task title"
          />
          <button type="button" onClick={addTask} className="btn-add">
            Add
          </button>
        </div>

        {tasks.length > 0 && (
          <p className="task-summary">
            {pendingCount === 0
              ? "All caught up!"
              : `${pendingCount} pending ${pendingCount === 1 ? "task" : "tasks"}`}
          </p>
        )}

        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={task.completed ? "completed" : ""}
            >
              <span>{task.title}</span>
              <div className="task-actions">
                <button
                  type="button"
                  className={`btn-status ${task.completed ? "is-done" : "is-pending"}`}
                  onClick={() => completeTask(task._id, task.completed)}
                >
                  {task.completed ? "Completed" : "Pending"}
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
          <p className="empty-state">No tasks yet. Add one above to get started.</p>
        )}
      </div>
    </div>

  );

}

export default App;
