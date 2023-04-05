/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getPublicRoutinesByUser } = require("../db/routines.js");
const { getUserByUsername, createUser, getUser } = require("../db/users.js");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});
// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  // console.log("BODY", req.body);
  try {
    // console.log("USERNAME", username);
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "UserExistsError",
        message: `User ${username} is already taken.`,
        error: "UserExistsError",
      });
    }
    const user = await createUser(req.body);
    // if (user.password.length < 8) {
    //   next({
    //     message: "Password Too Short!",
    //     error: "Password Too Short!",
    //     name: "Password Too Short!",
    //   });
    // }
    // console.log("_USER", _user);
    // console.log("USER", user);
    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      "secret"
    );
    res.send({
      user,
      message: "Thank you for signing up",
      token,
    });
  } catch (err) {
    next(err);
  }
});
// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "IncorrectCredentialsError",
      message: "Please supply both username and password",
      error: "IncorrectCredentialsError",
    });
  }

  try {
    const user = await getUser({ username, password });
    console.log("USER.PASSWORD", user.password);
    console.log("PASSWORD", password);
    if (user.password === password) {
      res.send({ message: "You're logged in!" });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// GET /api/users/me

// GET /api/users/:username/routines
usersRouter.get(":username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;
    const publicRoutinesByUser = await getPublicRoutinesByUser(username);
    res.send(publicRoutinesByUser);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
