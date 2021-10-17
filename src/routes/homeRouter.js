const express = require("express");
const cors = require("cors");

const { homeController } = require("../controllers/homeController");

const router = express.Router();

router.get("/", cors(), homeController);

module.exports = router;
