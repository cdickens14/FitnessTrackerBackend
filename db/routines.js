const client = require("./client");

const createRoutine = async({ creatorId, isPublic, name, goal }) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal])
  } catch(err) {
    console.log(err);
  }
}

async function getRoutineById(id) {}

const getRoutinesWithoutActivities = async() => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM routines
    `)
    return rows;
  } catch(err) {
    console.log(err);
  }
}

async function getAllRoutines() {}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
