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
      };
};

const findAllPets =  async (req, res) => {
    try{
      let heightInput = req.query.height;
      let weightInput = req.query.weight;
      let nameInput = req.query.name;
      for(let key in req.query){
        heightInput ? req.query.height = { $lte: Number(heightInput)} : '';
        weightInput ? req.query.weight = { $lte: Number(weightInput)} : '';
        nameInput ? req.query.name = { $regex: nameInput, $options: 'i' } : '';
        if(req.query[key] === '' || req.query[key] === 'Any'){
          delete req.query[key]
        }
      }
      queryParams = req.query;
      const pets = await readAllPets(queryParams);
      res.send(pets);
    }catch(err){
      console.log(err);
      res.status(500).send(err)
  };
};

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
    };
};

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
    };
};

const adoptFosterPet = async (req, res) => {
  const adoptType = req.body.type;
  const newPetAdoptionStatuts = `${adoptType}ed`;
  try{
    const newPetInfo = await getNewPetInfo(req, newPetAdoptionStatuts)
    const petUpdateRes = await updatePet(newPetInfo);
    try{
      const newUserInfo = await addPetToUserArray(req, newPetInfo, "myPets");
      const userUpdateRes = await updateUser(newUserInfo);
      res.status(200).send(newPetInfo);

    }catch(err){
      res.status(400).send("Error updating user");
      return;
    }
  }catch(err){
    res.status(400).send("Error updating pet");
    return;
  }
}

const returnPet = async (req, res) => {
  try{
    const newPetAdoptionStatuts = "Available";
    const newPetInfo = await getNewPetInfo(req, newPetAdoptionStatuts);
    const returnedPetInfo = {
      ...newPetInfo,
      userId: "",
    }
    const petUpdateRes = await updatePet(returnedPetInfo);
    try{
      const newUserInfo = await removePetFromUserArray(req, "myPets")
      const userUpdateRes = await updateUser(newUserInfo);
      res.status(200).send(returnedPetInfo);
    }catch(err){
      res.status(400).send("Error updating user");
      return;
    }
  }catch(err){
    res.status(400).send("Error updating pet");
    return;
  }
}

const savePet = async (req, res) => {
  try{
    const petId = req.params.id;
    const petInfoArray = await readPetById(petId);
    const petInfo = petInfoArray[0];
    const newUserInfo = await addPetToUserArray(req, petInfo, "savedPets");
    const userUpdateRes = await updateUser(newUserInfo);
    res.status(200).send(petInfo);

  }catch(err){
    res.status(400).send("Error updating User");
    return;
  }
}

const deletePet = async (req, res) => {
  try{
    const newUserInfo = await removePetFromUserArray(req, "savedPets");
    const userUpdateRes = await updateUser(newUserInfo);
    res.status(200).send(userUpdateRes);
  }catch(err){
    res.status(400).send("Error updating User");
    return;
  }
}

const getUserPets = async (req, res) => {
  try{
      const userId = req.params.id;
      const userInfo = await readUserById(userId);
      const userPets = {myPets: userInfo[0].myPets, savedPets: userInfo[0].savedPets};
      res.status(200).send(userPets);
  }catch(err){
      res.status(400).send("User not found")
  }
}

const getNewPetInfo = async(req, newPetAdoptionStatuts) => {
  const userId = req.body.userId;
  const petId = req.params.id;
  const oldPetInfoArray = await readPetById(petId);
  const oldPetInfo = oldPetInfoArray[0];
  const newPetInfo = {
      ...oldPetInfo,
      adoptionStatus: newPetAdoptionStatuts,
      userId: userId,
  };
  return newPetInfo
}

const addPetToUserArray = async (req, petInfo, arrayToUpdate) => {
  const userId = req.body.userId;
  const petId = req.params.id;
  const oldUserInfoArray = await readUserById(userId);
  const oldUserInfo = oldUserInfoArray[0];
  const filteredPetsArray = oldUserInfo.myPets.filter((pet) => pet.id !== petId);
  const newUserInfo = {
    ...oldUserInfo,
    [arrayToUpdate]: [...filteredPetsArray, petInfo]
  };
  return newUserInfo
}

const removePetFromUserArray = async (req, arrayToUpdate) => {
  const userId = req.body.userId;
  const petId = req.params.id;
  const oldUserInfoArray = await readUserById(userId);
  const oldUserInfo = oldUserInfoArray[0];
  const filteredPetsArray = oldUserInfo.myPets.filter((pet) => pet.id !== petId);
  const newUserInfo = {
    ...oldUserInfo,
    [arrayToUpdate]: filteredPetsArray
  };
  return newUserInfo
}

module.exports = {createPet, findAllPets, findPetById, updatePetById, adoptFosterPet, returnPet, savePet, deletePet, getUserPets}