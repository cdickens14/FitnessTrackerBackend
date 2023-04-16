const express = require("express");
const routinesRouter = express.Router();
const { attachActivitiesToRoutines, getActivityById } = require("../db/activities.js");
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutine,
} = require("../db/routines.js");
const { requireUser } = require("./utils");

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
  const { isPublic, name, goal } = req.body;
  const creatorId = req.user.id;
    try {
      if(!req.user) {
        next({
          name: "NotAuthorized",
          error: "NotAuthorized",
          message: "You are not authorized to create the routine"
        })
      } else {
        const routine = await createRoutine({ creatorId, isPublic, name, goal });
        res.send(routine);
      }
        
    } catch (err) {
      next (err);
    }
});

// PATCH /api/routines/:routineId
routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const num = parseInt(routineId);
  const { isPublic, name, goal } = req.body;
 
  const updateFields = {};

  if(isPublic === true) {
    updateFields.isPublic = true;
  } else {
    updateFields.isPublic = false;
  }

  if (name) {
    updateFields.name = name;
  }

  if (goal) {
    updateFields.goal = goal;
  }

    try {
      const updatedRoutine = await updateRoutine({id:num, updateFields})
      res.send(updatedRoutine);
      if (req.user.id !== updatedRoutine.creatorId){
        res.status(403).send("Unauthorized update error");
      }
      
    } catch (err) {
      next (err);
  }
});

// DELETE /api/routines/:routineId
routinesRouter.delete('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const id = req.user.id;

  try {
    const routine = await getRoutineById(routineId);
    if(routine) {
      if (routine.creatorId !== id) {
     
        res.status(403).send({
          name: "NotAllowedToUpdate",
          error: "NotAllowedToUpdate",
          message: `User ${req.user} is not allowed to update ${routine}`
        });
      } else {
        await destroyRoutine(routineId)
        res.send(routine);
      }
      
    }
    
  } catch (err) {
    next (err);
  }
});
// POST /api/routines/:routineId/activities
routinesRouter.post('/:routineId/activities', async (req, res, next) => {
  const { routineId } = req.params;
  const num = parseInt(routineId);

  try {
    const routine = await attachActivitiesToRoutines(routineId);
    const activityId = await getActivityById(num)
    if (routineId === activityId) {
      next({
        name: "ActivityAlreadyExists",
        error: "ActivityAlreadyExists",
        message:`Activity ID ${id} already exists in Routine ID ${id}`
      })
    }
    res.send(routineId);
  } catch (err) {
    next(err);
  }
});

module.exports = routinesRouter;
