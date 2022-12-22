const Ajv = require('ajv');
const ajv = new Ajv();
const { readAllUsers } = require('../models/userModels');

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
    const userEmail = req.body.email;
    const foundUser = allUsers.find(user => user.email === userEmail);
    if(foundUser){
        req.userExists = true
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

module.exports = { validateBody, confirmUserExists, checkPasswordsMatch };