require("dotenv").config()
const express = require("express");
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

// Setup your Middleware and API Router here
const apiRouter = require('./api/index.js');
app.use('/api', apiRouter);

apiRouter.use('*', (req, res, next) => {
    res.status(404);
    res.send({ error: 'route not found' });
});

// apiRouter.use((error, req, res, next) => {
//     res.send({
//       name: error.name,
//       message: error.message
//     });
//     next();
//   });

module.exports = app
