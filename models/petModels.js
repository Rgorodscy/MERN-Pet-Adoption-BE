const fs = require('fs');
const path = require('path');
const pathToPetsDb = path.resolve(__dirname, '../db/PetsDataSet.json');

function readAllPets() {
  const allPets = fs.readFileSync(pathToPetsDb);
  return JSON.parse(allPets);
}

function readAllPetsAsync() {
   return fs.readFile(pathToPetsDb, 'utf8', (err, data) => {
      if (err) {
        return err;
      } else {
        return JSON.parse(data);
      }
    });
  }

function addPet(newPet) {
  try {
    const allPets = readAllPets();
    allPets.push(newPet);
    fs.writeFileSync(pathToPetsDb, JSON.stringify(allPets));
    return allPets;
  } catch (err) {
    console.log(err);
  }
}

async function updatePet(newPetInfo) {
  try {
    const allPets = await readAllPets();
    const petId = newPetInfo.id
    const newAllPets = await allPets.filter(pet => pet.id !== petId);
    newAllPets.push(newPetInfo);
    fs.writeFileSync(pathToPetsDb, JSON.stringify(newAllPets));
    return newAllPets;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllPets, readAllPetsAsync, addPet, updatePet };