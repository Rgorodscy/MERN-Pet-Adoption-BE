const { v4: uuidv4 } = require('uuid');
const { readPetById, addPet, readAllPets, updatePet } = require('../models/petModels');


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
      const pets = await readAllPets();
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

module.exports = {createPet, findAllPets, findPetById, updatePetById}