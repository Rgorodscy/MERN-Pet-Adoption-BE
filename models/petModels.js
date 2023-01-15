const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  type: { type: "string" },
  name: { type: "string" },
  adoptionStatus: { type: "string" },
  image: { type: "string" },
  height: { type: "number" },
  weight: { type: "number" },
  color: { type: "string" },
  bio: { type: "string" },
  hypoallergenic: { type: "boolean" },
  dietary: { type: "string" },
  breed: { type: "string" },
  id: { type: "string" },
  userId: { type: "string" },
});

petSchema.statics.readSearchPets = async function (queryParams) {
  try {
    const allPets = await this.find(queryParams);
    return allPets;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

petSchema.statics.readPetById = async function (petId) {
  try {
    const pet = await this.findOne({ id: petId }).lean();
    return pet;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

petSchema.statics.addPet = async function (newPet) {
  try {
    const addedPet = await this.create(newPet);
    return addedPet;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

petSchema.statics.updatePet = async function (newPetInfo) {
  try {
    const petId = newPetInfo.id;
    const updateRes = await this.updateOne({ id: petId }, { ...newPetInfo });
    return updateRes;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = mongoose.model("Pet", petSchema);
