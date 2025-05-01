const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const {
  login,
  generateOTP,
  verifyOTP,
  verifyAuth,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/generate-otp", authenticateToken, generateOTP);
router.post("/verify-otp", authenticateToken, verifyOTP);
router.get("/verify", authenticateToken, verifyAuth);

module.exports = router;
