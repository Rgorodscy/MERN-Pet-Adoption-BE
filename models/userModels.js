const User = require('../mongooseSchemas/userMongooseSchema');

async function readAllUsers() {
  try{
    const allUsers = await User.find({});
    return allUsers;
  }catch(err){
    console.log(err)
  }
}

async function readUserById(userId) {
  try{
    const user = await User.find({ id: userId });
    return user
  }catch(err){
    console.log(err)
  } 
}

async function readUserByKey(key, value) {
  try{
    const user = await User.find({ [key]: value });
    return user
  }catch(err){
    console.log(err)
  } 
}
async function addUser(newUser) {
  try {
    const addedUser = await User.create(newUser);
    return addedUser;
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(newUserInfo) {
  try {
    const userId = newUserInfo.id;
    const updateRes = await User.updateOne({id: userId}, {...newUserInfo})
    return updateRes
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllUsers, readUserById, addUser, updateUser, readUserByKey };