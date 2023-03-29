/* eslint-disable no-useless-catch */
const { createUser } = require("./db/users.js");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser } = require("../db/users.js");

router.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});
// POST /api/users/register

// POST /api/users/login

// GET /api/users/me
router.get("/users/me", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
// GET /api/users/:username/routines

module.exports = router;
