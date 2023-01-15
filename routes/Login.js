const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { validateBody, confirmUserExists } = require('../middleware/userMiddleware');
const { loginSchema } = require('../schemas/userSchema');
const User = require('../models/userModels');

router.post('/', validateBody(loginSchema), confirmUserExists, async (req, res) => {
    if(req.userExists){
        try {
          const userEmail = req.body.email;
          const foundUser = await User.readUserByKey("email", userEmail);
          const hashedPassword = foundUser.password
          if(!foundUser){
            res.status(400).send("User not found");
            return;
          }
          const resBody = {
            ...foundUser,
            password: '',
            confirmPassword: ''};          
          const matched = await bcrypt.compare(req.body.password, hashedPassword,);
          if(!matched){
            res.status(400).send("Wrong Password");
            return;
          }
          if (matched) {
            delete resBody.password;
            delete resBody.confirmPassword;
            const token = jwt.sign({id: foundUser.id, isAdmin: foundUser.isAdmin}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
            const stringifiedUserData = JSON.stringify(resBody);
            res.status(200).send({token: token, userData: stringifiedUserData});
          };
        } catch (err) {
          res.status(500).send(err);
          console.log(err);
        }
    } else{
        res.status(400).send("User doesn't exist.");
    }
});

module.exports = router;
