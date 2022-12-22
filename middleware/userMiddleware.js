const Ajv = require('ajv');
const ajv = new Ajv();
const { readAllUsers } = require('../models/userModels');
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

function confirmUserExists(req, res, next) {
    console.log(req)  
    const allUsers = readAllUsers();
    const userEmail = req.body.email || req.body.currentUser.email;
    const foundUser = allUsers.find(user => user.email === userEmail);
    if(foundUser){
        req.userExists = true
    }
    next();
}
 
function checkNewEmailNotInUse(req, res, next) {
  console.log(req)  
  const allUsers = readAllUsers();
  const newUserEmail = req.body.newUserInfo.email;
  const currentUserEmail = req.body.currentUser.email;
  if(newUserEmail !== currentUserEmail){
    const foundUser = allUsers.find(user => user.email === newUserEmail);
    if(foundUser){
        req.emailInUse = true;
        res.status(400).send("New email already in use")
    }
  }
  next();
}

function checkPasswordsMatch(req, res, next) {
      if(req.body.password !== req.body.confirmPassword){
        res.status(400).send("Passwords don't match")
        return
      }
      next();
}

async function hashPassword(req, res, next){
  const plainPassword = req.body.password || req.body.newUserInfo.password;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  req.hashedPassword = hashedPassword;
  next()
}

module.exports = { validateBody, confirmUserExists, checkNewEmailNotInUse, checkPasswordsMatch, hashPassword  };