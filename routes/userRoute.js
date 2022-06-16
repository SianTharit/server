const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
// get All users
router.get("/all", userController.getAllUser);

// get user by id
router.get("/me", userController.getMe);

// Add Information
router.post("/:userId", userController.postMoreInfoUser);

// Edit Information
router.put("/:userId", userController.updateUser);

router.put("/updatePassword/:userId", userController.updatePassword);

module.exports = router;
