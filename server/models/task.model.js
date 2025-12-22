const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"]
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    due_date: {
        type: Date
    },
    completed_date: {
        type: Date
    },
    points: {
        type: Number,
        default: 10
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);