const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Successfully connected to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));