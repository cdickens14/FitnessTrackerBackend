const client = require("./client");

// database functions

// user functions
const createUser = async ({ username, password }) => {
  try {
    const { rows } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password]);
    delete rows[0].password;
    return rows[0];
} catch (err) {
  console.log(err);
}
}
//*****need to verify password from user against hashed password
const getUser = async ({ username, password }) => {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1
  `, [username]);
  delete rows[0].password;
  return rows[0];
  } catch(err) {
    console.log(err);
  }
}

const getUserById = async (userId) => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users
      WHERE id=$1
    `, [userId]);
    //does line 37 delete password from DB?
    delete rows[0].password;
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}

const getUserByUsername = async (userName)=> {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1
    `, [userName]);
    return user;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
