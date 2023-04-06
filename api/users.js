/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { getPublicRoutinesByUser } = require("../db/routines.js");
const { getUserByUsername, createUser } = require("../db/users.js");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});


// POST /api/users/register
usersRouter.post ('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);
    if(_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser(req.body);
    const token = jwt.sign({
      id: user.id,
      username
    })
    res.send({
      message: 'Thank you for signing up',
      token
    });
  } catch (err) {
    next (err);
  }
});
  
// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next();
  }

  try {
    const user = await getUserByUsername(username);
    const token = jwt.sign({ id: user.id, username: user.username}, "secret key")
    if (user && user.password === password) {
      res.send(user);
    } else {
      next();
    }
  } catch (err) {
    next (err);
  }
})
// GET /api/users/me

// GET /api/users/:username/routines
usersRouter.get(':username/routines', async (req, res, next) => {
  try {
    const { username } = req.params;
    const publicRoutinesByUser = await getPublicRoutinesByUser(username);
    res.send(publicRoutinesByUser.user);
  } catch (err) {
    next (err);
  }

});


module.exports = usersRouter;
