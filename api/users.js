/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
require("dotenv").config()
const { getPublicRoutinesByUser, getAllRoutinesByUser } = require("../db/routines.js");
const { getUserByUsername, createUser, getUser } = require("../db/users.js");
const { requireUser }= require('./utils.js');
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
        username
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
  if (!username || !password) {
    next({
      message: "No username or password provided"
    });
  }
  try {
      const user = await getUser({ username, password });
    
      if (!user) {
        next({
          name: "UserDoesNotExist",
          message: "User does not exist"
        })
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username
          
          },
           JWT_SECRET
          
        );
    
            res.send({
              user,
              message:"you're logged in!",
              token
          });
          
      }
      
      
  } catch (err) {
    next (err);
  }
});
// GET /api/users/me
usersRouter.get('/me', requireUser,  async (req, res, next) => {
 try {
  res.send(req.user)
} catch (err) {
  next (err);
}
    
});
// GET /api/users/:username/routines
  usersRouter.get('/:username/routines', async (req, res, next) => {
    try {
      const {username} = req.params;
      const user = await getUserByUsername(username);
      if(!user) {
        next({
          name: 'NoUser',
          message: `Error looking up user ${username}`
        });
      } else if(req.user && user.id === req.user.id) {
        const routines = await getAllRoutinesByUser({username: username});
        res.send(routines);
      } else {
        const routines = await getPublicRoutinesByUser({username: username});
        res.send(routines);
      }
    } catch (error) {
      next(error)
    }
  });

module.exports = usersRouter;
