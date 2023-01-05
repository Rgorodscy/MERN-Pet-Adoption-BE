const express = require('express');
const router = express.Router();
const { loginSchema } = require('../schemas/userSchema');
const { validateBody, confirmUserExists, hashPassword } = require('../middleware/userMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { readUserByKey } = require('../models/userModels');



// Login API
// route: ‘/login’ [POST]
// Retrieve the users data from the database and login the user.
// Change the res.body to token

router.post('/', validateBody(loginSchema), confirmUserExists, async (req, res) => {
    if(req.userExists){
        try {
          const userEmail = req.body.email;
          const foundUser = await readUserByKey("email", userEmail);
          const hashedPassword = foundUser[0].password
          if(!foundUser[0]){
            res.status(400).send("User not found")
          }
          const resBody = foundUser[0]._doc;
          const matched = await bcrypt.compare(req.body.password, hashedPassword,);
          if (matched) {
            delete resBody.password;
            delete resBody.confirmPassword;
            const token = jwt.sign({id: foundUser[0].id, isAdmin: foundUser[0].isAdmin}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
            const stringifiedUserData = JSON.stringify(foundUser[0]);
            res.status(200).send({token: token, userData: stringifiedUserData});
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
