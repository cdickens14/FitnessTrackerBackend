require("dotenv").config()
const express = require("express");
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { getUserById } = require('./db/users');
const { JWT_SECRET } = process.env;
app.use(morgan('dev'));
app.use(express.json());

// Setup your Middleware and API Router here
const apiRouter = require('./api/index.js');
app.use('/api', apiRouter);

apiRouter.use((req, res, next) => {
  if(req.user) {
    console.log('User is set:', req.user);
  }
  next();
});

// apiRouter.use(async (req, res, next) => {
//   const prefix = 'Bearer';
//   const auth = req.header('Authorization');

//   if(!auth) {
//       next();
//   } else if (auth.startsWith(prefix)) {
//       const token = auth.slice(prefix.length);
  
//       try {
//           const { id } = jwt.verify(token, JWT_SECRET);

//           if (id) {
//               req.user = await getUserById(id);
//               next();
//           }
//       } catch(err) {
//         next(err);
//       }
//   } else {
//       next({
//           name: 'AuthorizationHeaderError',
//           message: `Authorization token must start with ${ prefix }`
//       });
//   }
// });


app.use(cors());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/style', express.static(path.join(__dirname, 'style')));

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
