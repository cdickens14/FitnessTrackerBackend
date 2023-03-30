const express = require('express');
const router = express.Router();
const { getAllActivities, createActivity, getActivityById } = require('../db/activities.js');

router.use((req, res, next) => {
    console.log("A request is being made to /activities");
    next();
});

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
    try {
        const activity = await getActivityById(req.params.activityId);
        res.send(activity);
    } catch (err) {
        console.log(err);
    }
   next();
});

// GET /api/activities
router.get('/activities', async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send([activities]);
    } catch (err) {
      next (err);
    }
});
// POST /api/activities
router.post('/activities', async (req, res, next) => {
    try {
        const activity = await createActivity(req.body);
        res.send(activity);
    } catch (err) {
      next (err);
    }
});

// PATCH /api/activities/:activityId

module.exports = router;
