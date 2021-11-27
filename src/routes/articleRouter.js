const express = require("express");
const cors = require("cors");

const { articleController } = require("../controllers/articleController");

const router = express.Router();

router.get("/:id", cors(), articleController);

module.exports = router;
