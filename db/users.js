const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// database functions

// user functions
const createUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [user] } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username;
    `, [username, hashedPassword]);
    return user;
} catch (err) {
  console.log(err);
}
}

const getUser = async ({ username, password }) => {
  if (!username || !password) {
    return;
  }
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return;
    }
    const hashedPassword = user.password;
    const matchPassword = await bcrypt.compare(password, hashedPassword);
    if (!matchPassword) {
      return;
    }
    delete user.password;
    return user;
  } catch(err) {
    console.log(err);
  }
}

const getUserById = async (userId) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE id=$1
    `, [userId]);
    //does line 37 delete password from DB?
    delete user.password;
    return user;
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
    // delete user.password;
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
