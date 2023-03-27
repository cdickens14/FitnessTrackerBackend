const client = require("./client");
const { getUserByUsername } = require("./users");

const createRoutine = async ({ creatorId, isPublic, name, goal }) => {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (err) {
    console.log(err);
  }
};

const getRoutineById = async (id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM routines
      WHERE id=$1;
    `,
      [id]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

const getRoutinesWithoutActivities = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM routines;
    `);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const getAllRoutines = async () => {
  try {
    // needs to be rewordked to return output of attatchedActivitesToRoutines(routines) function
    const {
      rows: [routines],
    } = await client.query(`
      SELECT *
      FROM routines
      WHERE "isPublic" = true;
    `)
    return routines;
  } catch (err) {
    console.log(err);
  }
};

const getAllRoutinesByUser = async ({ username }) => {
  try {
    const user = await getUserByUsername(username);
     const {
       rows: [routines],
     } = await client.query(
       `
       SELECT routines.*, users.username AS "creatorName"
       FROM routines
       JOIN users ON routines."creatorId" = users.id
       WHERE creatorId = $1
     `,
       [user.id]
     );
  } catch (err) {
    console.log(err);
  }
}

const getPublicRoutinesByActivity = async ({ id }) => {
  try {

  } catch (err) {
    console.log(err);
  }

}
const getAllPublicRoutines = async () => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const getPublicRoutinesByUser = async ({ username }) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const updateRoutine = async ({ id, ...fields }) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const destroyRoutine = async (id) => {
  try {
    const { rows } = await client.query(`
      DELETE id
      FROM routines
      WHERE id=$1;
    `, [id]);
  } catch (err) {
    console.log(err);
  }
};

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
