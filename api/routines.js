const express = require('express');
const routinesRouter = express.Router();
const { attachActivitiesToRoutines } = require('../db/activities.js');
const { getAllRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine }= require('../db/routines.js');
const { requireUser} = require('./utils');

routinesRouter.use((req, res, next) => {
  console.log("A request is being made to /routines");
  next();
});

// GET /api/routines
routinesRouter.get('/', async (req, res, next) => {
    try {
        const routines = await getAllRoutines();
        res.send(routines);
    } catch (err) {
      next(err);
    }
});
// POST /api/routines
routinesRouter.post('/', requireUser, async (req, res, next) => {
  const { creatorId, isPublic, name, goal } = req.body;
    try {
        const routines = await createRoutine(req.body);
        res.send(routines);
    } catch ({ name, message }) {
      next ({ name, message });
    }
});

// PATCH /api/routines/:routineId
routinesRouter.patch('/:routineId', async (req, res, next) => {
  const { routineId } = req.params;
    const { isPublic, name, goal } = req.body;

    const updateFields = {};

    if(isPublic === false) {
      updateFields.isPublic = true;
    } else {
      updateFields.isPublic = false;
    }

    if(name) {
      updateFields.name = name;
    }

    if(goal) {
      updateFields.goal = goal;
    }

    try {
      const originalRoutine = await getRoutineById(req.params);

      if (originalRoutine.routineId === routineId) {
        const updatedRoutine = await updateRoutine(routineId, updateFields)
        res.send(updatedRoutine);
      }
    } catch ({ name, message }) {
      next ({ name, message });
  }
  
});


// DELETE /api/routines/:routineId
routinesRouter.delete('/:routineId', async (req, res, next) => {
  const { routineId } = req.params;
    try {
        const _routineId = await destroyRoutine(req.params);
        res.send(_routineId);
    } catch ({ name, message }) {
      next ({ name, message });
    }
})
// POST /api/routines/:routineId/activities
routinesRouter.post('/:routineId/activities', async (req, res, next) => {
    try {
        const routineId = await attachActivitiesToRoutines(req.params.routineId);
        res.send(routineId);
    } catch (err) {
      next (err);
    }
});

module.exports = routinesRouter;
