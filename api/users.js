/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
require("dotenv").config()
const { getPublicRoutinesByUser, getAllRoutinesByUser } = require("../db/routines.js");
const { getUserByUsername, createUser } = require("../db/users.js");

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
  try {
    const { username, password } = req.body;

    if ((!username && password)) {
      next();
    }
      const user = await getUserByUsername(username);
      
      const token = jwt.sign(
        {
          id: user.id,
          username
        
        },
         JWT_SECRET
        
      );
    
      const hashedPassword = user.password;
      const matchPassword = await bcrypt.compare(password, hashedPassword);
      if (!matchPassword) return;
      else {
        res.send({
          message:"You're logged in!",
          user,
          token
        });
      } 
  } catch (err) {
    next (err);
  }
});
// GET /api/users/me
usersRouter.get('/me', async (req, res, next) => {
// const { username } = req.
// console.log('RQ', req)
 try {
  const user = await getUserByUsername();
 
  // console.log("USER", username)
  const authHeader = req.headers['authorization'];
  // console.log('OTHER',authHeader)
  const token =  authHeader && authHeader.split(' ')[1];
  // console.log('TOKEN', token)
  if(!token) {
    res.status(401).send ({ 
      error: "NotAuthorized",
      name: "NotAuthorized",
      message: "You must be logged in to perform this action"
    });
  } else {
    res.send(user)
  }


// jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//   if (err) return res.sendStatus(401);
//   req.user = user;
// });

  

} catch (err) {
    next (err);
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
