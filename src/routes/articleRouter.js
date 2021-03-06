const express = require('express');

const { articleController } = require('../controllers/articleController');

const router = express.Router();

router.get('/:id', articleController);

module.exports = router;
