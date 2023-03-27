const client = require("./client");

const addActivityToRoutine = async ({
  routineId,
  activityId,
  count,
  duration,
}) => {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

const getRoutineActivityById = async (id) => {};

const getRoutineActivitiesByRoutine = async ({ id }) => {};

const updateRoutineActivity = async ({ id, ...fields }) => {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      UPDATE routine_activities
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return routineActivity;
  } catch (error) {
    throw error;
  }
};
const destroyRoutineActivity = async (id) => {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `DELETE FROM routine_activities
      WHERE id = $1`,
      [id]
    );
    return routineActivity;
  } catch (err) {
    console.log(err);
  }
};

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
