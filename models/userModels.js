const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
      email: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      phone: { type: 'string' },
      password: { type: 'string' },
      confirmPassword: { type: 'string' },
      id: { type: 'string', required: false },
      bio:  { type: 'string', required: false },
      savedPets: { type: 'array' },
      myPets:  { type: 'array' },
      isAdmin: { type: 'boolean' }
});

userSchema.statics.readAllUsers = async function() {
      try{
            const allUsers = await this.find({}, '-password -confirmPassword',);
            return allUsers;
      }catch(err){
            console.log(err);
            throw err;
      };
}

userSchema.statics.readUserById = async function(userId) {
      try{
            const user = await this.findOne({ id: userId
            }).lean();
            return user;
      }catch(err){
            console.log(err);
            throw err;
      };
}

userSchema.statics.readUserByKey = async function(key, value) {
      try{
            const user = await this.findOne({ [key]: value }).lean();
            return user;
      }catch(err){
            console.log(err);
            throw err;
      };
}

userSchema.statics.addUser = async function(newUser) {
      try {
            const addedUser = await this.create(newUser);
            return addedUser;
      } catch (err) {
            console.log(err);
            throw err;
      };
}

userSchema.statics.updateUser = async function(newUserInfo) {
      try {
            const userId = newUserInfo.id;
            const updateRes = await this.updateOne({id:
            userId}, {...newUserInfo})
            return updateRes;
      } catch (err) {
            console.log(err);
            throw err;
      };
}

module.exports = mongoose.model('User', userSchema)