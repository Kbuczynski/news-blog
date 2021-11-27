const express = require("express");
const cors = require("cors");

const commentsController = require("../../controllers/api/commentsController");

const router = express.Router();

router.get("/:id", cors(), commentsController.getComments);
router.post('/add', cors(), commentsController.addComment)
// TODO: add update (put)
router.delete('/remove/:id', cors(), commentsController.removeComment)

module.exports = router;
