const express = require('express');
const router = express.Router();
const staticController = require("../controllers/staticController.js");

router.get("/", staticController.index);

router.get("/api/hello", staticController.hello);


module.exports = router;