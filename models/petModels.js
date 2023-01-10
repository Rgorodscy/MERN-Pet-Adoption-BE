const Pet = require('../mongooseSchemas/petMongooseSchema');

async function readAllPets(queryParams) {
  try{
    const allPets = await Pet.find(queryParams);
    return allPets;
  }catch(err){
    console.log(err);
    throw err;
  };
}

async function readPetById(petId) {
  try{
    const pet = await Pet.find({ id: petId }).lean();
    return pet;
  }catch(err){
    console.log(err);
    throw err;
  };
}

async function addPet(newPet) {
  try {
    const addedPet = await Pet.create(newPet);
    return addedPet;
  } catch (err) {
    console.log(err);
    throw err;
  };
}

async function updatePet(newPetInfo) {
  try {
    const petId = newPetInfo.id;
    const updateRes = await Pet.updateOne({id: petId}, {...newPetInfo});
    return updateRes;
  } catch (err) {
    console.log(err);
    throw err;
  };
}

module.exports = { readAllPets, readPetById, addPet, updatePet };