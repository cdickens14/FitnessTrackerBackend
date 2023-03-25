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
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM routine_activity
    WHERE id =$1;
  `, [id]);
  } catch (err) {
    console.log(err);
  }
}

const getRoutineActivitiesByRoutine = async ({ id }) => {
  try {

  } catch (err) {
    console.log(err);
  }

}

const updateRoutineActivity = async ({ id, ...fields }) => {
  try {

  } catch (err) {
    console.log(err);
  }
}

const destroyRoutineActivity = async (id) => {
  try {
    const { rows } = await client.query(`
      DELETE id
      FROM routine_activities
      WHERE id = $1;
    `, [id]);
  } catch (err) {
    console.log(err);
  }
}

const canEditRoutineActivity = async (routineActivityId, userId) => {
  try {
    const {rows } = await client.query(`
    
    `)
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
