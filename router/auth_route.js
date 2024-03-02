const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth/authController.js");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.delete("/delete", authController.deleteUser);

module.exports = router;
