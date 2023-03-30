const express = require('express');
const router = express.Router();
const { destroyRoutineActivity } = require('../db/routine_activities.js');

// PATCH /api/routine_activities/:routineActivityId

// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', async (req, res, next) => {
    try {
        const routineActivityId = await destroyRoutineActivity(req.params.routineActivityId);
        res.send(routineActivityId);
    } catch (err) {
      console.log(err);
    }
    next();
});

module.exports = router;
