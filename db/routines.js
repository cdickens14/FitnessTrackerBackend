const client = require("./client");
const { addActivityToRoutine } = require("./routine_activities");
const { getUserByUsername } = require("./users");
//const { attachActivitiesToRoutines } = require("./activities");

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
    const {
      rows: [routines]
    } = await client.query(
      `
      SELECT *
      FROM activities
      JOIN routine_activities ON activities.id = routine_activities.activity_id
      WHERE routine_activities.routine_id = ${routines.id};
      `
    );
 routines.id = await addActivityToRoutine(routines);
   return routines.activities;
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
      WHERE creatorId = $1;
    `,
      [user.id]
    );
    return routines;
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
    const { 
      rows: [routines]
    } = await client.query(
      `
      SELECT *
      FROM routines
      WHERE "isPublic" = true;
      `
    )
    return routines;
  } catch (err) {
    console.log(err);
  }
};

const getPublicRoutinesByUser = async ({ username }) => {
  try {
    const { rows: [user] } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1 AND "isPublic"=true;
      `,
      [username]
    )
    return user;
  } catch (err) {
    console.log(err);
  }
};

const updateRoutine = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      UPDATE routines
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return routine;
  } catch (error) {
    console.log(error);
  }
};

const destroyRoutine = async (id) => {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      DELETE FROM routines
      WHERE id = $1;
      `,
      [id]
    );
    return routine[0];
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
