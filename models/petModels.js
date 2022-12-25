const Pet = require('../mongooseSchemas/petMongooseSchema');

async function readAllPets() { //Still needs to accept the query paramethers or create a new model to handle searches
  try{
    const allPets = await Pet.find({});
    return allPets
  }catch(err){
    console.log(err)
  }
}

async function readPetById(petId) {
  try{
    const pet = await Pet.find({ id: petId });
    return pet
  }catch(err){
    console.log(err)
  } 
}

async function addPet(newPet) {
  try {
    const addedPet = await Pet.create(newPet);
    return addedPet;
  } catch (err) {
    console.log(err);
  }
}

async function updatePet(newPetInfo) {
  try {
    const petId = newPetInfo.id;
    const updateRes = await Pet.updateOne({id: petId}, {...newPetInfo})
    return updateRes;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllPets, readPetById, addPet, updatePet };