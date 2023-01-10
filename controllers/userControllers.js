const { resolveSchema } = require('ajv/dist/compile');
const { v4: uuidv4 } = require('uuid');
const { readAllUsers, readUserById, updateUser } = require('../models/userModels');

const findAllUsers = async (req, res) => {
    try{
        const users = await readAllUsers();
        res.send(users);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    };
}

const findUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        const foundUser = await readUserById(userId);
        const userResponse = {
            ...foundUser[0],
            password: "",
            confirmPassword: "",
        };
        res.status(200).send(userResponse);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    };
}

const updateUserById = async (req, res) => {
    if(req.userExists && !req.emailInUse){
        try {
            const newUserInfo = {
                ...req.body
            };
            if(req.body.password === '') {
                delete newUserInfo.password;
                delete newUserInfo.confirmPassword
            };
            const updatedUser = await updateUser(newUserInfo);
            if (updatedUser) {
                res.send(updatedUser);
            };
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
            throw err;
        };
    };
}

module.exports = {findAllUsers, findUserById, updateUserById}