const client = require("./client");

// database functions
const createActivity = async({ name, description }) => {
  // return the new activity
  try {
    const { rows } = await client.query(`
    INSERT INTO activities(name, description)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, description]);

  return rows[0];
} catch (err) {
  console.log(err);
}
}

const getAllActivities = async() => {
  // select and return an array of all activities
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM activities;
    `)
    return rows;
  } catch(err) {
    console.log(err);
  }
}

const getActivityById = async(id) => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM activities
      WHERE id=$1
    `, [id]);
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}

const getActivityByName = async(name) => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM activities
      WHERE name=$1
    `, [name]);
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}
  
// used as a helper inside db/routines.js
const attachActivitiesToRoutines = async(routines) => {
  try {
    const { rows } = await client.query(`
      
    `)
  } catch(err) {
    console.log(err);
  }
}

const updateActivity = async({ id, ...fields }) => {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  try {
    const { rows } = await client.query(`
      UPDATE activities
      SET name = ${fields}
      description = ${fields}
      RETURNING *
    `);
    return rows;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
