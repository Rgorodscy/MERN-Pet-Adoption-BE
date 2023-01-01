const Ajv = require('ajv');
const { readPetById } = require('../models/petModels');
const ajv = new Ajv();

function validateBody(schema) {
  return (req, res, next) => {
    console.log(req.body)
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0].message);
      return;
    }
    next();
  };
}

async function checkPetAvailable(req, res, next) {
  const petId = req.params.id
  const foundPet = await readPetById(petId);
  const petAdoptStatus = foundPet[0].adoptionStatus;
  if(petAdoptStatus === "Adopted"){
    res.status(400).send("Pet already adopted");
    return;
  }
  if(petAdoptStatus === "Available"){
    next();
  }
  if(petAdoptStatus === "Fostered"){
    const userId = req.body.userId;
    const sameUser = foundPet[0].userId === userId;
    if(sameUser){
      next();
    }
    else{
      res.status(400).send("Pet already fostered by another user");
      return;
    }
  }
}

async function checkPetNotAvailable(req, res, next) {
  const petId = req.params.id
  const foundPet = await readPetById(petId);
  const petAdoptStatus = foundPet[0].adoptionStatus;

  if(petAdoptStatus === "Available"){
    res.status(400).send("Pet already available");
    return;
  }
  next();
}


module.exports = { validateBody, checkPetAvailable, checkPetNotAvailable };