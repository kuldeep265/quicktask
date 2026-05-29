const express = require("express");

const router = express.Router();

const Task = require("../models/Task");
const { auth } = require("../middleware/auth");

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const filter = { user: req.user.id };

    if (req.query.completed === "true") {
      filter.completed = true;
    } else if (req.query.completed === "false") {
      filter.completed = false;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const title = req.body.title?.trim();
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const newTask = new Task({
      title,
      completed: false,
      user: req.user.id
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const update = {};
    if (typeof req.body.completed === "boolean") {
      update.completed = req.body.completed;
    }
    if (req.body.title?.trim()) {
      update.title = req.body.title.trim();
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      update,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
