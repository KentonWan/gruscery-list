const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/users/new", userController.create);

router.post("/users/sign_in", userController.signIn);

router.get("/users/sign_out", userController.signOut);

module.exports = router;