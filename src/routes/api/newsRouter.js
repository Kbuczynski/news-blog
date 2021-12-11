const express = require("express");
const cors = require("cors");

const newsController = require("../../controllers/api/newsController");

const router = express.Router();

router.get("/", cors(), newsController.getAllNews);
router.get("/:id", cors(), newsController.getSingleNews);
router.post('/add', cors(), newsController.addNews)
router.put('/edit', cors(), newsController.editNews)
router.delete('/remove/:id', cors(), newsController.removeNews)

module.exports = router;
