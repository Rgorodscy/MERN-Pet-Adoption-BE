const express = require('express');
const router = express.Router();
const { userUpdateSchema } = require('../schemas/userSchema');
const { validateBody, confirmUserExists, checkNewEmailNotInUse, hashPassword } = require('../middleware/userMiddleware'); //Think about the check if the user exists
const { v4: uuidv4 } = require('uuid');
const userControllers = require('../controllers/userControllers')

// Get User By ID API
// Route ‘/user/:id’ [GET]
// This api allows you to get a user based on the user's id. 

router.get('/:id', userControllers.findUserById);


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

router.put('/:id', validateBody(userUpdateSchema), confirmUserExists, checkNewEmailNotInUse,   hashPassword, userControllers.updatePetById); 


// Get Users API
// Route ‘/user’ [GET] (protected to admin)
// The GET users API returns all users in the DB.
// The API should only return the information required

router.get('/', userControllers.findAllUsers);

// Get User By ID API
// Route ‘/user/:id/full’ [GET]
// This api allows you to get a user based on the user's id. 
// The API should return all the user details (aside from password) and the users pets they own.

router.get('/:id/full', userControllers.findUserById);

module.exports = router;
