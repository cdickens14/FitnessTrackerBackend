const client = require("./client");

const addActivityToRoutine = async({
  routineId,
  activityId,
  count,
  duration,
}) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [routineId, activityId, count, duration])
    return rows;
  } catch(err) {
    console.log(err);
  }
}

const getRoutineActivityById = async (id) => {

}

const getRoutineActivitiesByRoutine = async ({ id }) => {

}

const updateRoutineActivity = async ({ id, ...fields }) => {

}

const destroyRoutineActivity = async (id) => {

}

const canEditRoutineActivity = async (routineActivityId, userId) => {
  
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
