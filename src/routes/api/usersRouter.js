const express = require('express');

const usersController = require('../../controllers/api/usersController');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.post('/login', usersController.login);
router.post('/register', usersController.register);

module.exports = router;
