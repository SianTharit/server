const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/", cartController.getCartByUserId);

router.post("/:productId", cartController.createCart);

router.patch("/:id", cartController.updateCart);

router.delete("/:productId", cartController.deleteCart);

router.delete("/", cartController.clearCart);

module.exports = router;
