const { v4: uuidv4 } = require('uuid');
const { readPetById, addPet, readSearchPets, updatePet } = require('../models/petModels');
const { readUserById, updateUser } = require('../models/userModels');

const createPet = async (req, res) => {
    try {
        const petProps = req.body;
        const newPet = {
          ...petProps,
          id: uuidv4(),
        };
        const addedPet = await addPet(newPet);
        res.status(200).send(addedPet);
      } catch (err) {
        res.status(500).send(err);
        console.log(err);
      };
};

const findSearchPets =  async (req, res) => {
  try{
      queryParams = req.query;
      const pets = await readSearchPets(queryParams);
      res.send(pets);
    }catch(err){
      console.log(err);
      res.status(500).send(err);
  };
};

const findPetById = async (req, res) => {
    try{
        const id = req.params.id;
        const pet = await readPetById(id);
        res.status(200).send(pet);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    };
};

const updatePetById = async (req, res) => {
    try {
      const newPetInfo = req.body;
      const updateRes = await updatePet(newPetInfo);
      res.status(200).send(newPetInfo);
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
      console.log(err);
    };
  }catch(err){
    res.status(400).send("Error updating pet");
    console.log(err);
  };
}

const returnPet = async (req, res) => {
  try{
    const newPetAdoptionStatuts = "Available";
    const newPetInfo = await getNewPetInfo(req, newPetAdoptionStatuts);
    const returnedPetInfo = {
      ...newPetInfo,
      userId: "",
    };
    const petUpdateRes = await updatePet(returnedPetInfo);
    try{
      const newUserInfo = await removePetFromUserArray(req, "myPets")
      const userUpdateRes = await updateUser(newUserInfo);
      res.status(200).send(returnedPetInfo);
    }catch(err){
      res.status(400).send("Error updating user");
      console.log(err);
    };
  }catch(err){
    res.status(400).send("Error updating pet");
    console.log(err);
  };
}

const savePet = async (req, res) => {
  try{
    const petId = req.params.id;
    const petInfoArray = await readPetById(petId);
    const petInfo = petInfoArray;
    const newUserInfo = await addPetToUserArray(req, petInfo, "savedPets");
    const userUpdateRes = await updateUser(newUserInfo);
    res.status(200).send(petInfo);
  }catch(err){
    res.status(400).send("Error updating User");
    console.log(err);
  };
}

const deletePet = async (req, res) => {
  try{
    const newUserInfo = await removePetFromUserArray(req, "savedPets");
    const userUpdateRes = await updateUser(newUserInfo);
    res.status(200).send(userUpdateRes);
  }catch(err){
    res.status(400).send("Error updating User");
    console.log(err);
  };
}

const getUserPets = async (req, res) => {
  try{
      const userId = req.params.id;
      const userInfo = await readUserById(userId);
      const userPets = {myPets: userInfo.myPets, savedPets: userInfo.savedPets};
      res.status(200).send(userPets);
  }catch(err){
      res.status(400).send("User not found");
      console.log(err);
  };
}

const getNewPetInfo = async(req, newPetAdoptionStatuts) => {
  try{
    const userId = req.body.userId;
    const petId = req.params.id;
    const oldPetInfo = await readPetById(petId);
    const newPetInfo = {
        ...oldPetInfo,
        adoptionStatus: newPetAdoptionStatuts,
        userId: userId,
    };
    return newPetInfo
  }catch(err){
    console.log(err);
    throw err;
  }
}

const addPetToUserArray = async (req, petInfo, arrayToUpdate) => {
  try{
    const userId = req.body.userId;
    const petId = req.params.id;
    const oldUserInfo = await readUserById(userId);
    const filteredPetsArray = oldUserInfo[arrayToUpdate].filter((pet) => pet.id !== petId);
    const newUserInfo = {
      ...oldUserInfo,
      [arrayToUpdate]: [...filteredPetsArray, petInfo]
    };
    return newUserInfo
  }catch(err){
    console.log(err);
    throw err;
  }
}

const removePetFromUserArray = async (req, arrayToUpdate) => {
  try{
    const userId = req.body.userId;
    const petId = req.params.id;
    const oldUserInfo = await readUserById(userId);
    const filteredPetsArray = oldUserInfo[arrayToUpdate].filter((pet) => pet.id !== petId);
    const newUserInfo = {
      ...oldUserInfo,
      [arrayToUpdate]: filteredPetsArray
    };
    return newUserInfo
  }catch(err){
    console.log(err);
    throw err;
  }
}

module.exports = {createPet, findSearchPets, findPetById, updatePetById, adoptFosterPet, returnPet, savePet, deletePet, getUserPets}