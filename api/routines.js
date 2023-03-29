const express = require('express');
const router = express.Router();
const { getAllRoutines, createRoutine, getRoutineById, destroyRoutine }= require('../db/routines.js');

// GET /api/routines
router.get('/', async (req, res, next) => {
    try {
        const routines = await getAllRoutines();
    res.send(routines);
    } catch (err) {
      console.log(err);
    }
    next();
});
// POST /api/routines
router.post('/routines', async (req, res, next) => {
    try {
        const routines = await createRoutine(req.body);
        res.send(routines);
    } catch (err) {
      console.log(err);
    }
    next();
});

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId
router.delete('/:routineId', async (req, res, next) => {
    try {
        const routineId = await destroyRoutine(req.params.routineId);
        res.send(routineId);
    } catch (err) {
      console.log(err);
    }
    next();
})
// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async (req, res, next) => {
    try {
        const routineId = await getRoutineById(req.params.routineId);
    res.send(routineId);
    } catch (err) {
      console.log(err);
    }
    next();
});

module.exports = router;
