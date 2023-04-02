require("dotenv").config()
const express = require("express");
const app = express();
const morgan = require('morgan');
const path = require('path');
app.use(morgan('dev'));
app.use(express.json());

// Setup your Middleware and API Router here
const apiRouter = require('./api/index.js');
app.use('/api', apiRouter);

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('*', (req, res, next) => {
    res.status(404);
    res.send({ error: 'route not found' });
});

app.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });

});

module.exports = app
