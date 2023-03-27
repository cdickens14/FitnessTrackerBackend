const client = require("./client");

// database functions
const createActivity = async ({ name, description }) => {
  // return the new activity
  try {
    const { rows } = await client.query(
      `
    INSERT INTO activities(name, description)
    VALUES ($1, $2)
    RETURNING *;
  `,
      [name, description]
    );

    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

const getAllActivities = async () => {
  // select and return an array of all activities
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
    const { rows } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE id=$1
    `,
      [id]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

const getActivityByName = async (name) => {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE name=$1
    `,
      [name]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

// used as a helper inside db/routines.js
const attachActivitiesToRoutines = async (routines) => {
  console.log();
  // incomplete function
  // doug suggested that we map over routines
  try {
    // get an individual routine by looping through routines
    for (let i = 0; i < routines.length; i++) {
      // select activities that have a corresponding routine ID from database
      const routine = routines[i];
      console.log(routine);
      const {
        rows: [activities],
      } = await client.query(`
      SELECT *
      FROM activities
      JOIN routine_activities ON activities.id = routine_activities.activity_id
      WHERE routine_activities.routine_id = routine.id
    `);
      // routine.activities =
    }
  } catch (err) {
    console.log(err);
  }
};

const updateActivity = async ({ id, ...fields }) => {
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
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return activity;
  } catch (error) {
    throw error;
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
