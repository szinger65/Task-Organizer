const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

require('./config/mongoose.config');

const authController = require('./controllers/auth.controller');

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
const auth = require('./middleware/auth');
app.put('/api/profile', auth, authController.updateProfile);

require('./routes/task.routes')(app);
require('./routes/goal.routes')(app);
require('./routes/progress.routes')(app);

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
}
  
module.exports = app;