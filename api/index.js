const express = require('express');
const router = express.Router();
const { getAllActivities, getActivityById, createActivity } = require('../db/activities.js');
const { createUser } = require('../db/users.js');
const { getAllRoutines, createRoutine, getRoutineById, getAllRoutinesByUser } = require('../db/routines.js');

// GET /api/health
router.get('/health', async (req, res, next) => {
    res.send("All is well");
    next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

router.post('/register', async(req, res, next) => {
    try {
        const user = await createUser();
        res.send({user});
    } catch (err) {
        console.log(err);
    }
    next();
    
});

router.get('/me', async (req, res, next) => {
    try {
        const users = await getAllRoutinesByUser();
        res.send(users);
    } catch (err) {
      console.log (err);
    } 
    next();

});
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

router.get('/:activityId/routines', async (req, res, next) => {
    try {
        const activity = await getActivityById(req.params.activityId);
        res.send(activity);
    } catch (err) {
     throw Error("That activity does not exist");
    }
//does not throw err message in browser
   next();
});

router.post('/activities', async (req, res, next) => {
    try {
        const activity = await createActivity(req.body);
        res.send(activity);
    } catch (err) {
      next (err);
    }
});


// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);
router.get('/', async (req, res, next) => {
    try {
        const routines = await getAllRoutines();
    res.send(routines);
    } catch (err) {
      console.log(err);
    }
   next(); 
});

router.post('/routines', async (req, res, next) => {
    try {
        const routines = await createRoutine(req.body);
        res.send(routines);
    } catch (err) {
      console.log(err);
    }
    next();
});

router.post('/:routineId/activities', async (req, res, next) => {
    try {
        const routineId = await getRoutineById(req.params.routineId);
    res.send(routineId);
    } catch (err) {
      console.log(err);
    }
    next();
});


// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);

module.exports = router;
