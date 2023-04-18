require("dotenv").config()
const express = require("express");
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
app.use(morgan('dev'));
app.use(express.json());

// Setup your Middleware and API Router here
const apiRouter = require('./api/index.js');
app.use('/api', apiRouter);

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.headers['Authorization'];

  if (!auth) {
    next(); // don't set req.user, no token was passed in
  }


  if (auth.startsWith(prefix)) {
    // recover the token
    const token = auth.slice(prefix.length);
    try {
      // recover the data
      const { id } = jwt.verify(data, 'secret message');

      // get the user from the database
      const user = await getUserById(id);
      // note: this might be a user or it might be null depending on if it exists

      // attach the user and move on
      req.user = user;

      next();
    } catch (error) {
      // there are a few types of errors here
    }
  }
});

app.use(cors());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/style.css', express.static(path.join(__dirname, 'style.css')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'style.css')));



app.use('*', (req, res, next) => {
    res.status(404);
    res.send({ error: 'route not found' });
});

app.use((error, req, res, next) => {
    res.send({
      name: error.name,
      error: error.name,
      message: error.message
    });

});

module.exports = app
