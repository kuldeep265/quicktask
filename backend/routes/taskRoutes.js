const express = require("express");

const router = express.Router();

const Task = require("../models/Task");



// GET TASKS
router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.json(tasks);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});



// ADD TASK
router.post("/add", async (req, res) => {

    try {

        const newTask = new Task({
            title: req.body.title,
            completed: false
        });

        await newTask.save();

        res.json(newTask);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});



// DELETE TASK
router.delete("/:id", async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({ message: "Task Deleted" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});



// UPDATE TASK
router.put("/:id", async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});



module.exports = router;