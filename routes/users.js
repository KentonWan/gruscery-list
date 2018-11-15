const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/users/new", userController.create);

module.exports = router;