const express = require('express');
const router = express.Router();
const { petSchema } = require('../schemas/petSchema');
const { validateBody } = require('../middleware/petMiddleware'); //Think about the check if the pet exists
const { v4: uuidv4 } = require('uuid');

const { readAllPetsAsync, addPet, readAllPets, updatePet } = require('../models/petModels');

// ADD PET API
// Route: ‘/pet’ [POST] (Protected to admin only)
// TODO: Handle photo upload, Admin Protection
router.post('/', validateBody(petSchema), (req, res) => {
    try {
      const petProps = req.body;
      const newPet = {
        ...petProps,
        id: uuidv4(),
      };
      const addedPet = addPet(newPet);
      if (addedPet) {
        res.status(200).send(newPet);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
});


// GET PETS API
// Route: ‘/pet’ [GET] 
// The get pets API is responsible for retrieving pets that match the criteria given.
// Can receive query parameters to search the database
// Retrieve results to match query. If no parameters are passed it should return all the results.
// Should only return the fields necessary 
// Search Fields: 
// Adoption Status
// Type
// Height
// Weight
// Name
router.get('/', async (req, res) => {
    const pets = readAllPets();
    res.send(pets);
});


// GET PET BY ID API
// Route: ‘/pet/:id’ [GET]
// Get a pet by ID should take an id and return the corresponding pet from the database. 
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const pets = readAllPets();
        const foundPet = await pets.find(pet => pet.id === id);
        stringifiedFoundPet = JSON.stringify(foundPet)
        res.status(200).send(stringifiedFoundPet);
        return
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});
  
// EDIT PET API
// Route: ‘/pet/:id’ [PUT] (protected to admin only)
// Handle photo upload

router.put('/:id', validateBody(petSchema), async (req, res) => {
    try {
      const newPetInfo = req.body;
      const newAllPets = await updatePet(req.body);
      if (newAllPets) {
        res.status(200).send(newPetInfo);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
}); 
  

// Adopt/Foster API
// Route ‘/pet/:id/adopt’ [POST] (protected to logged in users)
// The Adopt/Foster API is responsible for adding the pet to the current users pets.
// This API also should change the pet’s adoption status. 
// Field: 
// Type (Adopt or foster)
router.post('/:id/adopt', async (req, res) => {
    res.send('Hi');
});

// Return Pet API
// Route ‘/pet/:id/return’ [POST] (protected to logged in users)
// The Return Pet API is responsible for returning the pet to the agency. 
// The API should change the pets status back to available
// The API should remove the pet from the users pets.
router.post('/:id/return', async (req, res) => {
    res.send('Hi');
});

// Save Pet API
// Route ‘/pet/:id/save’ [POST] (protected to logged in users)
// The save PET api allows a user to save a pet for later
// The saved pet should be stored as saved in the users account
router.post('/:id/save', async (req, res) => {
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


