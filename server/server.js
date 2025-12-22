const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');

require('./routes/task.routes')(app);
require('./routes/goal.routes')(app);
require('./routes/progress.routes')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;