const express = require("express");
const router = express.Router();

const listController = require("../controllers/listController")

router.get("/lists", listController.index);

router.get("/lists/all", listController.getAllLists);

module.exports = router;