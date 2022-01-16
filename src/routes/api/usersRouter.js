const express = require('express');

const usersController = require('../../controllers/api/usersController');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
// TODO: add user delete and modify routes

module.exports = router;
