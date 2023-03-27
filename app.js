require("dotenv").config()
const express = require("express");
const app = express();

// Setup your Middleware and API Router here
const apiPath = require('./api/index.js');
app.use('/api', apiPath);

const requireUser = (req, res, next) => {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
}

app.use('*', (req, res, next) => {
    res.status(404);
    res.send({ error: 'Route not found'});
    next();
});

module.exports = app, requireUser
