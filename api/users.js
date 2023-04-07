/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
require("dotenv").config()
const { getPublicRoutinesByUser, getAllRoutinesByUser } = require("../db/routines.js");
const { getUserByUsername, createUser, getUserById } = require("../db/users.js");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});


// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "UserExistsError",
        message: `User ${username} is already taken.`,
        error: "UserExistsError",
      });
    }
    const user = await createUser(req.body);
    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      "secret"
    );
    if (req.body.password.length < 8) {
      next({
        name: "Password Too Short!",
        message: "Password Too Short!",
        error: "Password Too Short!",
      });
    } else {
      res.send({
      user,
      message: "Thank you for signing up",
      token,
    })}
  } catch (err) {
    next (err);
  }
});
// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  // if (!username || !password) {
  //   next({
  //     name: "MissingCredentialsError",
  //     message: "Please supply both username and password"
  //   });
  // }
  try {
    const user = await getUserByUsername(username);
    const token = jwt.sign(
      {
        id: user.id,
        username
      },
      JWT_SECRET
    );
    const hashedPassword = user.password;
    const matchPassword = await bcrypt.compare(req.body.password, hashedPassword);
    if (!matchPassword) return;
    else if (matchPassword) {
      res.send({
        user,
        message: "You're logged in!",
        token
      });
    }
  
  } catch (err) {
    next (err);
  }
});
// GET /api/users/me
usersRouter.get('/me', async (req, res, next) => {
  // const { username, password } = req.body;
    const prefix = 'Bearer';
    const auth = req.header('Authorization');

  if(!auth) {
      next();
  } else if (auth.startsWith(prefix)) {
  const token = auth.slice(prefix.length);
  try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
      } catch (err) {
        next (err);
      }
  } else {
      res.status(401).send;
  }
});
  
// GET /api/users/:username/routines
usersRouter.get('/:username/routines', async (req, res, next) => {
  try {
    const { username } = req.params;
    const publicRoutinesByUser = await getPublicRoutinesByUser(username);
    if (!username) return;
    else {
      res.send(publicRoutinesByUser);
    }
    const routinesForLoggedInUser = await getAllRoutinesByUser(username)
    if (!username) return;
    else {
      res.send(routinesForLoggedInUser);
    }
    
    } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
