const express = require("express");

const newsController = require("../../controllers/api/newsController");

const router = express.Router();

router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getSingleNews);
router.post("/add", newsController.addNews);
router.put("/edit", newsController.editNews);
router.delete("/remove/:id", newsController.removeNews);

module.exports = router;
