const Ajv = require('ajv');
const ajv = new Ajv();
const { readUserByKey, readUserById } = require('../models/userModels');
const bcrypt = require('bcrypt');
const saltRounds = 10;


 function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0].message);
      return;
    }
    next();
  };
}

async function confirmUserExists(req, res, next) {
  const userEmail = req.body.email || req.body.currentUser.email;
  const foundUser = await readUserByKey("email", userEmail);
    if(foundUser[0]){
        req.userExists = true
    }
    next();
}
 
async function checkNewEmailNotInUse(req, res, next) {
  const currentUserInfo = await readUserById(req.body.id);
  const newUserEmail = req.body.email;
  const userWithNewEmail = await readUserByKey("email", newUserEmail);
  const currentUserEmail = currentUserInfo.email;
  if(newUserEmail !== currentUserEmail){
    if(userWithNewEmail.id !== currentUserInfo.id){
      req.emailInUse = true;
      res.status(400).send("New email already in use");
      return
    }
  }
  next();
}

async function checkPasswordsMatch(req, res, next) {
      if(req.body.password !== req.body.confirmPassword){
        res.status(400).send("Passwords don't match")
        return
      }
      next();
}

async function hashPassword(req, res, next){
  const plainPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  req.hashedPassword = hashedPassword;
  next()
}

module.exports = { validateBody, confirmUserExists, checkNewEmailNotInUse, checkPasswordsMatch, hashPassword  };