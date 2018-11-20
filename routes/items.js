const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController")

router.get('/lists/:listId/items/all', itemController.getItems);

router.post('/lists/:listId/items/create', itemController.create);

router.post("/lists/:listId/items/:id/destroy", itemController.destroy);

router.post("/lists/:listId/items/:id/update", itemController.update);



module.exports = router;