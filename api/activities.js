const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, updateActivity, getActivityById, getActivityByName } = require('../db/activities.js');
const { getPublicRoutinesByActivity } = require('../db/routines');

activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /activities");
    next();
});

// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  const { activityId } = req.params;
    try {
        const activity = await getPublicRoutinesByActivity({id:activityId})
       
        // const _activity = await getActivityById(req.params);
        if(activity) {
          res.send(activity);
        } else {
          console.log("ERROR")
          next ({ 
            error: 'ActivityAlreadyExists',
            name: 'ActivityAlreadyExists',
            message: `Activity ${activityId} not found`
          })
        } 
         
        
    } catch (err) {
      next (err);
    }
});

// GET /api/activities
activitiesRouter.get('/', async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(activities);
    } catch (err) {
      next (err);
    }
});
// POST /api/activities
activitiesRouter.post('/', async (req, res, next) => {
  const { name, description } = req.body;
    try {
        const _activity = await getActivityByName(name);
        if(_activity) {
          next({
            name: 'ActivityAlreadyExists',
            error: 'ActivityAlreadyExists',
            message: `An activity with name ${name} already exists`
          });
        } else {
          const activity = await createActivity(req.body);
          res.send(activity);
        }
    } catch (err) {
      next (err);
    }
});

// PATCH /api/activities/:activityId
activitiesRouter.patch('/:activityId', async (req, res, next) => {
    const { activityId } = req.params;
    const { name, description} = req.body;

    const updateFields = {};

    if(name) {
      updateFields.name = name;
    }

    if(description) {
      updateFields.description = description;
    }

    try {
      const originalActivity = await getActivityById(req.params);

      if (!originalActivity) {
        next({
          name: 'ActivityDoesNotExist',
          error: 'ActivityDoesNotExist',
          message: `Activity ${activityId} not found`
        })
      }

      else if (originalActivity.name === name) {
        next({
          name: 'ActivityNameExists',
          error: 'ActivityNameExist',
          message: `An activity with name ${name} already exists`
        })
        console.log(originalActivity)
      }
      // if (originalActivity.activityId === activityId) {
        else {
          const updatedActivity = await updateActivity(activityId, updateFields)
          res.send(updatedActivity);
      }
    } catch ({ name, message }) {
      next ({ name, message });
      }
});

module.exports = activitiesRouter;
