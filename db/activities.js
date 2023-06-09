const client = require("./client");

// database functions
const createActivity = async ({ name, description }) => {
  try {
    const { rows: [activity] } = await client.query(
    `
    INSERT INTO activities(name, description)
    VALUES ($1, $2)
    RETURNING *;
   `,
      [name, description]
    );

    return activity;
  } catch (err) {
    console.log(err);
  }
};

const getAllActivities = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM activities;
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const getActivityById = async (id) => {
  try {
    const { rows: [activity] } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE id=$1
    `,
      [id]
    );
    return activity;
  } catch (err) {
    console.log(err);
  }
};

const getActivityByName = async (name) => {
  try {
    const { rows: [activity] } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE name=$1
    `,
      [name]
    );
    return activity;
  } catch (err) {
    console.log(err);
  }
}

// used as a helper inside db/routines.js
const attachActivitiesToRoutines = async (routines) => {
  const routinesToReturn = [...routines];
  const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
  const routineIds = routines.map(routine => routine.id);
  if (!routineIds?.length) return [];
  
  try {
    const { rows: activities } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
      FROM activities 
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE routine_activities."routineId" IN (${ binds });
    `, routineIds);

    for(const routine of routinesToReturn) {
      const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
      routine.activities = activitiesToAdd;
    }
    return routinesToReturn;
  } catch (error) {
    console.log (error);
  }
}
const updateActivity = async ({ id, ...fields }) => {
  const setString = Object.keys(fields.updateFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields.updateFields)
    
    );
    
    return activity;
    
  } catch (error) {
    console.log(error);
  }

};

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
