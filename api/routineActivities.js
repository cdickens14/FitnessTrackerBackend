const express = require('express');
const routineActivitiesRouter = express.Router();
const { destroyRoutineActivity, getRoutineActivityById, updateRoutineActivity } = require('../db/routine_activities.js');

routineActivitiesRouter.use((req, res, next) => {
  console.log("A request is being made to /routine_activities");
  next();
});
// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch('/:routineActivityId', async (req, res, next) => {
  const { routineActivityId } = req.params;
    const { routineId, activityId, duration, count } = req.body;

    const updateFields = {};

    if(routineId) {
      updateFields.routineId = routineId;
    }

    if(activityId) {
      updateFields.activityId = activityId;
    }

    if(duration) {
      updateFields.duration = duration;
    }
     if (count) {
      updateFields.count = count;
     }

    try {
      const originalRoutineActivity = await getRoutineActivityById(req.params);

      if (originalRoutineActivity.routineActivityId === routineActivityId) {
        const updatedRoutineActivity = await updateRoutineActivity(routineActivityId, updateFields)
        res.send(updatedRoutineActivity);
      }
    } catch ({ name, message }) {
      next ({ name, message });
  }
  
});

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete('/:routineActivityId', async (req, res, next) => {
  const { routineActivityId } = req.params;
    try {
        const routineActivityId = await destroyRoutineActivity(req.params);
        res.send(routineActivityId);
    } catch ({ name, message }) {
      next ({ name, message });
    }
});

module.exports = routineActivitiesRouter;
