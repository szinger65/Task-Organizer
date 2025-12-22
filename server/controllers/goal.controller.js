const Goal = require('../models/goal.model');

module.exports.getAllGoals = (req, res) => {
    Goal.find().sort({ createdAt: -1 })
        .then(goals => res.json(goals))
        .catch(err => res.status(400).json(err));
};

module.exports.createGoal = (req, res) => {
    Goal.create(req.body)
        .then(goal => res.json(goal))
        .catch(err => res.status(400).json(err));
};

module.exports.updateGoal = (req, res) => {
    Goal.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true, runValidators: true }
    )
        .then(updatedGoal => res.json(updatedGoal))
        .catch(err => res.status(400).json(err));
};

module.exports.deleteGoal = (req, res) => {
    Goal.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};