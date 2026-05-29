const express = require("express");

const router = express.Router();

const Task = require("../models/Task");
const { auth } = require("../middleware/auth");
const { startOfDay, parseDueDate } = require("../utils/dates");

router.use(auth);

function resolveStatus(req) {
  if (req.query.status === "pending" || req.query.status === "completed" || req.query.status === "expired") {
    return req.query.status;
  }
  if (req.query.completed === "true") return "completed";
  if (req.query.completed === "false") return "pending";
  return null;
}

function buildFilter(userId, status) {
  const today = startOfDay();
  const filter = { user: userId };

  if (status === "completed") {
    filter.completed = true;
    return filter;
  }

  filter.completed = false;

  if (status === "expired") {
    filter.dueDate = { $lt: today };
    return filter;
  }

  if (status === "pending") {
    filter.$or = [
      { dueDate: { $gte: today } },
      { dueDate: { $exists: false } }
    ];
    return filter;
  }

  return filter;
}

router.get("/", async (req, res) => {
  try {
    const status = resolveStatus(req);
    const filter = buildFilter(req.user.id, status);

    const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 });

    const normalized = tasks.map((task) => {
      const doc = task.toObject();
      if (!doc.dueDate) {
        doc.dueDate = doc.createdAt;
      }
      return doc;
    });

    res.json(normalized);
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

    const dueDate = parseDueDate(req.body.dueDate);
    if (!dueDate) {
      return res.status(400).json({ message: "A valid due date is required" });
    }

    const newTask = new Task({
      title,
      completed: false,
      dueDate,
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
    if (req.body.dueDate !== undefined) {
      const dueDate = parseDueDate(req.body.dueDate);
      if (!dueDate) {
        return res.status(400).json({ message: "A valid due date is required" });
      }
      update.dueDate = dueDate;
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
