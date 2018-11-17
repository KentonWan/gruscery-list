const express = require("express");
const router = express.Router();

const listController = require("../controllers/listController")

router.get("/lists/", listController.index);

router.post("/lists/create", listController.create);


module.exports = router;