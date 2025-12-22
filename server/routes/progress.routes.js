const ProgressController = require('../controllers/progress.controller');

module.exports = (app) => {
    app.get('/api/progress/:email', ProgressController.getProgress);
    app.get('/api/progress', ProgressController.getProgress);
    app.post('/api/progress', ProgressController.createProgress);
    app.put('/api/progress/:id', ProgressController.updateProgress);
};