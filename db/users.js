const client = require("./client");

// database functions

// user functions
const createUser = async({ username, password }) => {
  const { rows } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password]);
    
}

const getUser = async({ username, password }) => {
  const { rows } = await client.query(`
    SELECT *
    FROM users
    
  `)

}

const getUserById = async(userId) => {

}

const getUserByUsername = async(userName)=> {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
