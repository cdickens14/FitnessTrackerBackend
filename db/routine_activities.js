const client = require("./client");

const addActivityToRoutine = async ({
  routineId,
  activityId,
  count,
  duration,
}) => {
  try {
    const { rows: [routineActivity] } = await client.query(
      `
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      ON CONFLICT ("activityId", "routineId") DO NOTHING
      RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );
    console.log(routineActivity)
    return routineActivity;
  } catch (err) {
    console.log(err);
  }
};

const getRoutineActivityById = async (id) => {
  try {
    const { rows: [routineActivity] } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE id =$1;
      `,
      [id]
    )
    return routineActivity;
  } catch (err) {
    console.log(err);
  }
  
};

const getRoutineActivitiesByRoutine = async ({ id }) => {
  try {
    const { rows: [routineActivity]} = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE routine_id=$1;
      `,
      [id]
    )
    return routineActivity;
  } catch (err) {
    console.log(err);
  }
  
};

const updateRoutineActivity = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

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
    console.log(error);
  }
};
const destroyRoutineActivity = async (id) => {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE id = $1
      `,
      [id]
    );
    return routineActivity[0];
  } catch (err) {
    console.log(err);
  }
};

const canEditRoutineActivity = async (routineActivityId, userId) => {
  try {
    const { rows: [routineActivity]} = await client.query(
      `
      SELECT *
      FROM routines
      WHERE creator_id = {userId};
      `
    )
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
