const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false },
    completed_date: Date
});

const GoalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: String,
    category: {
        type: String,
        enum: ['health', 'career', 'education', 'personal', 'financial', 'relationships'],
        default: 'personal'
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'paused'],
        default: 'active'
    },
    target_date: Date,
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    milestones: [MilestoneSchema],
    points: {
        type: Number,
        default: 50
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);