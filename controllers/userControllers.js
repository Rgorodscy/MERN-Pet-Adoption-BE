const { resolveSchema } = require('ajv/dist/compile');
const User = require('../models/userModels');

const findAllUsers = async (req, res) => {
    try{
        const users = await User.readAllUsers();
        res.send(users);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    };
}

const findUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        const foundUser = await User.readUserById(userId);
        const userResponse = {
            ...foundUser,
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
            const updatedUser = await User.updateUser(newUserInfo);
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