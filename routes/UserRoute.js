const express = require('express');
const router = express.Router();
const { userSchema } = require('../schemas/userSchema');
const { validateBody } = require('../middleware/userMiddleware'); //Think about the check if the user exists
const { v4: uuidv4 } = require('uuid');

const { readAllUsers, readAllUsersAsync, addUser, updateUser } = require('../models/userModels');


// Get User By ID API
// Route ‘/user/:id’ [GET]
// This api allows you to get a user based on the user's id. 

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const users = readAllUsers();
        const foundUser = await users.find(user => user.id === id);
        stringifiedFoundUser = JSON.stringify(foundUser)
        res.status(200).send(stringifiedFoundUser);
        return
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});


// Update User API
// Route ‘/user/:id’ [PUT] (protected to logged in user)
// This API allows you to change your settings while logged in.
// Validate user inputs
// Ensure that if the email is being changed it’s not already in use

// Fields:
// Password
// Email
// first name
// last name
// phone number
// bio

router.put('/:id', validateBody(userSchema), async (req, res) => {
    try {
      const newUserInfo = req.body;
      const newAllUsers = await updateUser(req.body);
      if (newAllUsers) {
        res.status(200).send(newUserInfo);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
}); 


// Get Users API
// Route ‘/user’ [GET] (protected to admin)
// The GET users API returns all users in the DB.
// The API should only return the information required

router.get('/', async (req, res) => {
    const users = readAllUsers();
    res.send(users);
});

// Get User By ID API
// Route ‘/user/:id/full’ [GET]
// This api allows you to get a user based on the user's id. 
// The API should return all the user details (aside from password) and the users pets they own.

router.get('/:id/full', async (req, res) => {
    try{
        const id = req.params.id;
        const users = readAllUsers();
        const foundUser = await users.find(user => user.id === id);
        stringifiedFoundUser = JSON.stringify(foundUser)
        res.status(200).send(stringifiedFoundUser);
        return
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});

module.exports = router;
