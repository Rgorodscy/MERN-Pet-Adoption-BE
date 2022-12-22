const express = require('express');
const router = express.Router();
const { signupSchema } = require('../schemas/userSchema');
const { validateBody, confirmUserExists, checkPasswordsMatch } = require('../middleware/userMiddleware'); //Think about the check if the user exists
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const { readAllUsers, readAllUsersAsync, addUser } = require('../models/userModels');



// Signup API
// route: ‘/signup’ [POST]
// The signup api is responsible for signing up a new user. 
// Validate all the user input is valid
// Check that passwords match
// Make sure the email address is unique 
// Store the user in your DB and log the user in
// Be sure not to save the users password as a plain string. (bcrypt is a great tool for this)

// Fields:  
// Email Address
// Password (twice to make sure passwords match)
// First and last name
// Phone number

router.post('/', validateBody(signupSchema), confirmUserExists, checkPasswordsMatch,  async (req, res) => {
    if(!req.userExists){
        try {
            const userProps = req.body;
          const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
          const newUser = {
            ...userProps,
            password: encryptedPassword,
            confirmPassword: encryptedPassword,
            id: uuidv4(),
          };
          const addedUser = addUser(newUser);
          if (addedUser) {
            res.status(200).send(newUser);
          }
        } catch (err) {
          res.status(500).send(err);
          console.log(err);
        }
    } else{
        res.status(400).send("Email in use, user already exists")
    }
});

module.exports = router;
