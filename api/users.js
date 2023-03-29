/* eslint-disable no-useless-catch */
const { createUser } = require("./db/users.js");

const express = require("express");
const router = express.Router();

// POST /api/users/register
router.post("/users/register", async (req, res, next) => {
  const user = await createUser();
  res.send(user);
});
// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
