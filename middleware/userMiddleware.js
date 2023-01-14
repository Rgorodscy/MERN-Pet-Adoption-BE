const Ajv = require('ajv');
const ajv = new Ajv();
const { readUserByKey, readUserById } = require('../models/userModels');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0].message);
      return;
    }
    next();
  };
};

async function confirmUserExists(req, res, next) {
  try{
    const userEmail = req.body.email || req.body.currentUser.email;
    const foundUser = await readUserByKey("email", userEmail);
    if(foundUser[0]){
        req.userExists = true;
    };
    next();
  }catch(err){
    res.status(400).send("Please provide a valid email and password");
    console.log(err);
    return;
  }
};
 
async function checkNewEmailNotInUse(req, res, next) {
  const currentUserInfo = await readUserById(req.body.id);
  const newUserEmail = req.body.email;
  const userWithNewEmail = await readUserByKey("email", newUserEmail);
  const currentUserEmail = currentUserInfo.email;
  if(newUserEmail !== currentUserEmail){
    if(userWithNewEmail.id !== currentUserInfo.id){
      req.emailInUse = true;
      res.status(400).send("New email already in use");
      return;
    };
  };
  next();
}

function checkPasswordsMatch(req, res, next) {
  if(req.body.password !== req.body.confirmPassword){
    res.status(400).send("Passwords don't match");
    return;
  }
  next();
};

async function hashPassword(req, res, next){
  if(req.method === 'PUT' && req.body.password === ''){
    next();
    return;
  };
  try{
    const plainPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    req.body.password = hashedPassword;
    req.body.confirmPassword = hashedPassword;
    next();
  }catch(err){
    res.status(500).send("Error hashing password");
    console.log(err);
    return;
  };
};

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send('Authorization headers required');
    return;
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    };
    if (decoded) {
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
      next();
    };
  });
};

const checkAdmin = async (req, res, next) => {
  if(req.isAdmin !== true){
    res.status(401).send('Unauthorized, user is not Admin');
    return;
  };
  next();
};

module.exports = { validateBody, confirmUserExists, checkNewEmailNotInUse, checkPasswordsMatch, hashPassword, auth, checkAdmin  };