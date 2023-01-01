const express = require('express');
const router = express.Router();
const { userUpdateSchema } = require('../schemas/userSchema');
const { validateBody, confirmUserExists, checkNewEmailNotInUse, hashPassword } = require('../middleware/userMiddleware'); //Think about the check if the user exists
const { v4: uuidv4 } = require('uuid');
const userControllers = require('../controllers/userControllers')
const { auth, checkAdmin } = require('../middleware/userMiddleware')

// Get User By ID API
// Route ‘/user/:id’ [GET]
router.get('/:id', userControllers.findUserById);


// Update User API
// Route ‘/user/:id’ [PUT] (protected to logged in user)
router.put('/:id', auth,  validateBody(userUpdateSchema), confirmUserExists, checkNewEmailNotInUse,   hashPassword, userControllers.updatePetById); 


// Get Users API
// Route ‘/user’ [GET] (protected to admin)
router.get('/', auth, checkAdmin, userControllers.findAllUsers);

// Get User By ID API
// Route ‘/user/:id/full’ [GET]
router.get('/:id/full', userControllers.findUserById);

module.exports = router;
