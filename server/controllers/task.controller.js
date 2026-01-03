const Task = require('../models/task.model');

module.exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.userId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.createTask = async (req, res) => {
    try {
        const newTask = {
            ...req.body,
            user_id: req.userId
        };
        const task = await Task.create(newTask);
        res.json(task);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.getOneTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user_id: req.userId });
        res.json(task);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user_id: req.userId },
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.deleteTask = async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id, user_id: req.userId });
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};