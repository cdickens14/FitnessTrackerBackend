const express = require("express");
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users.js');
const { JWT_SECRET } = process.env;

apiRouter.use (async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { 
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
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

// GET /api/health
apiRouter.get("/health", async (req, res, next) => {
  res.send("All is well");
});

// ROUTER: /api/users
const usersRouter = require("./users");
apiRouter.use('/users', usersRouter);
  

// ROUTER: /api/activities
const activitiesRouter = require("./activities");
apiRouter.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
apiRouter.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require("./routineActivities");
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;
