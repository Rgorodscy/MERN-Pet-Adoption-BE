const express = require('express');
const router = express.Router();
const { loginSchema } = require('../schemas/userSchema');
const { validateBody, confirmUserExists, hashPassword } = require('../middleware/userMiddleware');
const bcrypt = require('bcrypt');

const { readUserByKey } = require('../models/userModels');

// Login API
// route: ‘/login’ [POST]
// Retrieve the users data from the database and login the user.
// Change the res.body to token

router.post('/', validateBody(loginSchema), confirmUserExists, hashPassword, async (req, res) => {
    if(req.userExists){
        try {
          const userEmail = req.body.email;
          const foundUser = await readUserByKey("email", userEmail);
          if(!foundUser[0]){
            res.status(400).send("User not found")
          }
          const resBody = {
            ...foundUser[0]._doc,
            password: req.body.password,
            confirmPassword: req.body.password
          }
          const matched = bcrypt.compare(req.body.password, foundUser[0].password);
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
