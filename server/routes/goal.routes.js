const GoalController = require('../controllers/goal.controller');

module.exports = (app) => {
    app.get('/api/goals', GoalController.getAllGoals);
    app.post('/api/goals', GoalController.createGoal);
    app.put('/api/goals/:id', GoalController.updateGoal);
    app.delete('/api/goals/:id', GoalController.deleteGoal);
};