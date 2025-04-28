const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.put('/users/:id', userController.editUser); // Actualizează utilizatorul
router.delete('/users/:id', userController.deleteUser); // Șterge utilizatorul
module.exports = router;
