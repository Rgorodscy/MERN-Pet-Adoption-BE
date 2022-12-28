const { v4: uuidv4 } = require('uuid');
const { readPetById, addPet, readAllPets, updatePet } = require('../models/petModels');
const { readUserById, updateUser } = require('../models/userModels');


const createPet = async (req, res) => {
    try {
        const petProps = req.body;
        const newPet = {
          ...petProps,
          id: uuidv4(),
        };
        const addedPet = await addPet(newPet);
        if (addedPet) {
          res.status(200).send(addedPet);
        }
      } catch (err) {
        res.status(500).send(err);
        console.log(err);
      }
}

const findAllPets =  async (req, res) => {
    try{
      queryParams = req.query;
      const pets = await readAllPets(queryParams);
      res.send(pets);
    }catch(err){
      console.log(err);
      res.status(500).send(err)
  }
}

const findPetById = async (req, res) => {
    try{
        const id = req.params.id;
        const pet = await readPetById(id);
        // stringifiedFoundPet = JSON.stringify(pet)
        res.status(200).send(pet);
        return
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}

const updatePetById = async (req, res) => {
    try {
      const newPetInfo = req.body;
      const updateRes = await updatePet(newPetInfo);
      if (updateRes) {
        res.status(200).send(newPetInfo);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
}

const adoptFosterPet = async (req, res) => {
  const adoptType = req.body.type;
  const userId = req.body.userId;
  const petId = req.params.id;
  const oldPetInfoArray = await readPetById(petId);
  const oldPetInfo = oldPetInfoArray[0];
  const newPetAdoptionStatuts = `${adoptType}ed`;
  oldPetInfo.adoptionStatus = newPetAdoptionStatuts;
  
  const newPetInfo = {
      ...oldPetInfo,
      adoptionStatus: newPetAdoptionStatuts,
      userId: userId,
  }
  const petUpdateRes = await updatePet(newPetInfo);
  if(petUpdateRes){
      const oldUserInfoArray = await readUserById(userId);
      const oldUserInfo = oldUserInfoArray[0];
      const newUserInfo = {
          ...oldUserInfo,
          myPets: [...oldUserInfo.myPets, newPetInfo]
      }
      const userUpdateRes = await updateUser(newUserInfo);
      if(!userUpdateRes){
          res.status(400).send("Error updating user");
          return;
      }
  }
  if(!petUpdateRes){
      res.status(400).send("Error updating pet");
      return;
  }
  res.status(200).send(newPetInfo);
}

const returnPet = async (req, res) => {
  const userId = req.body.userId;
  const petId = req.params.id;
  const oldPetInfoArray = await readPetById(petId);
  const oldPetInfo = oldPetInfoArray[0];  
  delete oldPetInfo.userId
  const newPetInfo = {
    ...oldPetInfo,
    adoptionStatus: "Available",
  }
  const petUpdateRes = await updatePet(newPetInfo);
  if(petUpdateRes){
    const oldUserInfoArray = await readUserById(userId);
    const oldUserInfo = oldUserInfoArray[0];
    const filteredPetsArray = oldUserInfo.myPets.filter((pet) => pet.id !== petId)
    const newUserInfo = {
        ...oldUserInfo,
        myPets: filteredPetsArray
    }
    const userUpdateRes = await updateUser(newUserInfo);
    if(!userUpdateRes){
        res.status(400).send("Error updating user");
        return;
    }
  }
  if(!petUpdateRes){
    res.status(400).send("Error updating pet");
    return;
  }
res.status(200).send(newPetInfo);
}

module.exports = {createPet, findAllPets, findPetById, updatePetById, adoptFosterPet, returnPet}