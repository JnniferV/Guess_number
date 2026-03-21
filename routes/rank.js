// Classement
const express = require("express");

const rankController = require("../controllers/rankController");

const router = express.Router();

router.get("/", rankController.getRank);

module.exports = router;
