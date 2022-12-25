const { v4: uuidv4 } = require('uuid');
const { readAllUsers, readUserById, updateUser } = require('../models/userModels');

const findAllUsers = async (req, res) => {
    try{
        const users = await readAllUsers();
        res.send(users);
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}

const findUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        const userResponse = await readUserById(userId);
        res.status(200).send(userResponse);
        return
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}

const updatePetById = async (req, res) => {
    if(req.userExists && !req.emailInUse){
        try {
        const encryptedPassword = req.hashedPassword
        const newUserInfo = {
            ...req.body,
            password: encryptedPassword,
            confirmPassword: encryptedPassword,
        }
        const updatedUser = await updateUser(newUserInfo);
        if (updatedUser) {
            res.status(200).send(updatedUser);
        }
        } catch (err) {
        res.status(500).send(err);
        console.log(err);
        }
    }
}

module.exports = {findAllUsers, findUserById, updatePetById}