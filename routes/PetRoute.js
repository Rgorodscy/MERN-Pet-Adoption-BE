const express = require('express');
const router = express.Router();
const petControllers = require('../controllers/petControllers');
const { validateBody, checkPetAvailable, checkPetNotAvailable, upload, rebuildReqBody, buildSearchParams } = require('../middleware/petMiddleware');
const { auth, checkAdmin } = require('../middleware/userMiddleware');
const { petSchema } = require('../schemas/petSchema');

router.post('/', auth, checkAdmin, upload.single('image'), rebuildReqBody ,validateBody(petSchema), petControllers.createPet);

router.get('/', buildSearchParams, petControllers.findSearchPets);

router.get('/:id', petControllers.findPetById);
  
router.put('/:id', auth, checkAdmin, upload.single('image'), rebuildReqBody, validateBody(petSchema), petControllers.updatePetById); 
  
router.post('/:id/adopt', auth,  checkPetAvailable, petControllers.adoptFosterPet);

router.post('/:id/return', auth,  checkPetNotAvailable, petControllers.returnPet);

router.post('/:id/save', auth,  petControllers.savePet);

router.delete('/:id/save', auth,  petControllers.deletePet);
  
router.get('/user/:id', petControllers.getUserPets);

module.exports = router;