const express = require('express');
const router = express.Router();
const { petSchema } = require('../schemas/petSchema');
const { validateBody, checkPetAvailable, checkPetNotAvailable } = require('../middleware/petMiddleware'); //Think about the check if the pet exists
const { v4: uuidv4 } = require('uuid');
const Pet = require('../mongooseSchemas/petMongooseSchema');
const petControllers = require('../controllers/petControllers');
const { readUserById, updateUser } = require('../models/userModels');
const { readPetById, addPet, readAllPets, updatePet } = require('../models/petModels');

// ADD PET API
// Route: ‘/pet’ [POST] (Protected to admin only)
// TODO: Handle photo upload, Admin Protection
router.post('/', validateBody(petSchema), petControllers.createPet);


// GET PETS API
// Route: ‘/pet’ [GET] 
router.get('/', petControllers.findAllPets);


// GET PET BY ID API
// Route: ‘/pet/:id’ [GET]
// Get a pet by ID should take an id and return the corresponding pet from the database. 
router.get('/:id', petControllers.findPetById);
  
// EDIT PET API
// Route: ‘/pet/:id’ [PUT] (protected to admin only)
// Handle photo upload

router.put('/:id', validateBody(petSchema), petControllers.updatePetById); 
  

// Adopt/Foster API
// Route ‘/pet/:id/adopt’ [POST] (protected to logged in users)
//TODO: protect the same user from adopting/fostering more than once
router.post('/:id/adopt', checkPetAvailable, petControllers.adoptFosterPet);

// Return Pet API
// Route ‘/pet/:id/return’ [POST] (protected to logged in users)
// The Return Pet API is responsible for returning the pet to the agency. 
// The API should change the pets status back to available
// The API should remove the pet from the users pets.
router.post('/:id/return', checkPetNotAvailable, petControllers.returnPet)

// Save Pet API
// Route ‘/pet/:id/save’ [POST] (protected to logged in users)
// The save PET api allows a user to save a pet for later
// The saved pet should be stored as saved in the users account
router.post('/:id/save', async (req, res) => {
    //search pet object, put it on savedPets in user object
    res.send('Hi');
});



// Delete Saved Pet API
// Route ‘/pet/:id/save’ [DELETE] (protected to logged in users)
// The save PET api allows a user to remove a saved pet.
router.delete('/:id/save', async (req, res) => {
    res.send('Hi');
});
  
// Get Pets By User ID API
// Route ‘/pet/user/:id’ [GET]
// This api allows a user to get the pets owned by (or saved) by a user based on the user id.
router.get('/user/:id', async (req, res) => {
    res.send('Hi');
});


module.exports = router;



