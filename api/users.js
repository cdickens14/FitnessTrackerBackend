/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../db/users.js');

router.use((req, res, next) => {
    console.log("A request is being made to /users");
    next();
});
// POST /api/users/register
router.post('/users/register', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            next({
                name: "UserExistsError",
                message: "A user by that username already exists"
            });
        }
        const user = await createUser({ username, password});
        const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({ 
            message: "Thank you for signing up",
            token
        });
    } catch (err) {
      next(err);
    }
})
// POST /api/users/login

// GET /api/users/me
router.get('/users/me', async (req, res, next) => {
    try {
        
        
    } catch (err) {
      next (err);
    } 

});
// GET /api/users/:username/routines

module.exports = router;
