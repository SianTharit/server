const express = require("express");

const { checkoutCreditCard } = require("../controllers/omiseController");

const router = express.Router();

router.post("/checkout-credit-card", checkoutCreditCard);

module.exports = router;
