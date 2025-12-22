const UserProgress = require('../models/progress.model');

module.exports.getProgress = (req, res) => {
    const filter = req.params.email ? { email: req.params.email } : {};
    
    UserProgress.find(filter)
        .then(progress => res.json(progress))
        .catch(err => res.status(400).json(err));
};

module.exports.createProgress = (req, res) => {
    UserProgress.create(req.body)
        .then(newProgress => res.json(newProgress))
        .catch(err => res.status(400).json(err));
};

module.exports.updateProgress = (req, res) => {
    UserProgress.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json(err));
};