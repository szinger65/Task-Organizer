const TaskController = require('../controllers/task.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/tasks', auth, TaskController.getAllTasks);
    app.post('/api/tasks', auth, TaskController.createTask);
    app.get('/api/tasks/:id', auth, TaskController.getOneTask);
    app.put('/api/tasks/:id', auth, TaskController.updateTask);
    app.delete('/api/tasks/:id', auth, TaskController.deleteTask);
};