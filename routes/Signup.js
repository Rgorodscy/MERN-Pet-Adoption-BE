const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { validateBody, confirmUserExists, checkPasswordsMatch, hashPassword } = require('../middleware/userMiddleware');
const { signupSchema } = require('../schemas/userSchema');
const User = require('../models/userModels');

router.post('/', validateBody(signupSchema), confirmUserExists, checkPasswordsMatch, hashPassword, async (req, res) => {
    if(!req.userExists){
        try {
          const userInfo = req.body;
          const newUser = {
            ...userInfo,
            id: uuidv4(),
            myPets: [],
            savedPets: [],
            isAdmin: false,
          };
          const resBody = {
            ...newUser,
            password: '',
            confirmPassword: '',
          };
          const addedUser = User.addUser(newUser);
          if (addedUser) {
            res.status(200).send(resBody);
          }
        } catch (err) {
          res.status(500).send(err);
          console.log(err);
        }
    } else{
        res.status(400).send("Email in use, user already exists")
    };
});

module.exports = router;
