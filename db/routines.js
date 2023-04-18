const client = require("./client");
const { getUserByUsername } = require("./users");
const { attachActivitiesToRoutines } = require("./activities");

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

const getRoutineById = async ({id}) => {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT *
      FROM routines
      WHERE id=$1;
    `,
      [id]
    );
    return routine;
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
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      
      `
    );
    return attachActivitiesToRoutines(routines);
  } catch (err) {
    console.log(err);
  }
};

const getAllRoutinesByUser = async ({ username }) => {
  try {
    const user = await getUserByUsername(username);
    const {
      rows: routines,
    } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE "creatorId" = $1;
    `,
      [user.id]
    );
    return routines;
  } catch (err) {
    console.log(err);
  }
};

const getPublicRoutinesByActivity = async ({ id }) => {
  try {
  
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      JOIN routine_activities ON routine_activities."routineId" = routines.id
      WHERE routine_activities."activityId" = $1 AND "isPublic" = true
      `,
      [id]
    );
    return attachActivitiesToRoutines(routines);
  } catch (err) {
    console.log(err);
  }
};
const getAllPublicRoutines = async () => {
  try {
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE "isPublic" = true;
      `
    );
    return attachActivitiesToRoutines(routines);
  } catch (err) {
    console.log(err);
  }
};

const getPublicRoutinesByUser = async ({ username }) => {
  try {
    const user = getUserByUsername(username);
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE "creatorId"=$1;
      `,
      [user.id]
    );
    return attachActivitiesToRoutines(routines);
  } catch (err) {
    console.log(err);
  }
};

const updateRoutine = async ({ id, ...fields }) => {
  const setString = Object.keys(fields.updateFields)
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
      Object.values(fields.updateFields)
    );

    return routine;
  } catch (error) {
    console.log(error);
  }
};

const destroyRoutine = async (id) => {
  try {
    const { rows } = await client.query(
      `
      DELETE 
      FROM routine_activities
      WHERE "routineId" = ${id};
      `
    );
    await client.query(
      `
      DELETE 
      FROM routines
      WHERE id = ${id};
      `
    );
     
  } catch (err) {
    console.log (err)
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
