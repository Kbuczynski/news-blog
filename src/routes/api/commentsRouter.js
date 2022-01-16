const express = require('express');

const commentsController = require('../../controllers/api/commentsController');

const router = express.Router();

router.get('/:newsId', commentsController.getComments);
router.post('/add', commentsController.addComment);
router.delete('/remove/:id', commentsController.removeComment);

module.exports = router;
