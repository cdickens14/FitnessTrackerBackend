const express = require('express');
const router = express.Router();
const { getAllActivities } = require('../db/activities.js');
// const { getUserByUsername, createUser } = require('../db/users.js');

// GET /api/health
router.get('/health', async (req, res, next) => {
    res.send("All is well");
    next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);
// router.post('/users/register', async (req, res, next) => {
//     const { username, password } = req.body;

//     try {
//         const _user = await getUserByUsername(username);
//         if (_user) {
//             next({
//                 name: "UserExistsError",
//                 message: "A user by that username already exists"
//             });
//         }
//         const user = await createUser({ username, password});
//         const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
//             expiresIn: '1w'
//         });

//         res.send({ 
//             message: "Thank you for signing up",
//             token
//         });
//     } catch (err) {
//       next(err);
//     }
// })

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);
router.get('/activities', async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send([activities]);
    } catch (err) {
      next (err);
    }
});

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);

module.exports = router;
