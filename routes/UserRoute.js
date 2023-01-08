const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')
const { validateBody, confirmUserExists, checkNewEmailNotInUse, hashPassword, auth, checkAdmin } = require('../middleware/userMiddleware');
const { userUpdateSchema } = require('../schemas/userSchema');

router.get('/:id', userControllers.findUserById);

router.put('/:id', auth,  validateBody(userUpdateSchema), confirmUserExists, checkNewEmailNotInUse,  hashPassword, userControllers.updateUserById); 

router.get('/', auth, checkAdmin, userControllers.findAllUsers);

router.get('/:id/full', userControllers.findUserById);

module.exports = router;
