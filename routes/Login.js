const express = require('express');
const router = express.Router();
const { loginSchema } = require('../schemas/userSchema');
const { validateBody, confirmUserExists } = require('../middleware/userMiddleware');
const bcrypt = require('bcrypt');

const { readAllUsers, readAllUsersAsync } = require('../models/userModels');

// Login API
// route: ‘/login’ [POST]
// The login api is responsible for logging in existing users
// Validate all the user input is valid
// Check the email and password match an existing user
// Retrieve the users data from the database and login the user.

// Fields: 
// Email address 
// Password

router.post('/', validateBody(loginSchema), confirmUserExists, async (req, res) => {
    if(req.userExists){
        try {
          const allUsers = await readAllUsers();
          const userEmail = req.body.email;
          const foundUser = allUsers.find(user => user.email === userEmail);
          if(!foundUser){
            res.status(400).send("User not found")
          }
          const resBody = {
            ...foundUser,
            password: req.body.password,
            confirmPassword: req.body.password
          }
          const matched = await bcrypt.compare(req.body.password, foundUser.password);
          if (matched) {
            res.status(200).send(resBody);
          }
          if(!matched){
            res.status(400).send("Wrong Password")
          }
        } catch (err) {
          res.status(500).send(err);
          console.log(err);
        }
    } else{
        res.status(400).send("User doesn't exist.")
    }
});

module.exports = router;
