import React, { useEffect, useState } from "react";
import axios from "axios";

 API_BASE_URLconst = process.env.REACT_APP_API_URL || "http://localhost:5002";

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



  return (

    <div style={{ padding: "30px" }}>

      <h1>QuickTask</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add
      </button>



      <ul>

        {tasks.map((task) => (

          <li key={task._id}>

            {task.title}

            {"  "}

            <button onClick={() => completeTask(task._id, task.completed)}>

              {task.completed ? "Completed" : "Pending"}

            </button>

            {"  "}

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>

          </li>

        ))}

      </ul>

    </div>

  );

}

export default App;