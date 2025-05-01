const jwt = require("jsonwebtoken");
const { users, otps } = require("../config/db");
const { sendOTPEmail } = require("../utils/emailService");

const JWT_SECRET = process.env.JWT_SECRET || "key@1234j63";

const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    message: "Login successful",
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
};

const generateOTP = async (req, res) => {
  const userId = req.user.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otps[userId] = {
    code: otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  };

  const emailSent = await sendOTPEmail(user.email, user.name, otp);

  if (!emailSent) {
    return res.status(500).json({ message: "Failed to send OTP email" });
  }

  res.json({
    message: "OTP sent to your email",
    expiresAt: otps[userId].expiresAt,
  });
};

const verifyOTP = (req, res) => {
  const { otp } = req.body;
  const userId = req.user.id;

  if (!otps[userId]) {
    return res.status(400).json({ message: "No OTP generated for this user" });
  }

  if (otps[userId].code !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  if (new Date() > new Date(otps[userId].expiresAt)) {
    return res.status(401).json({ message: "OTP has expired" });
  }

  delete otps[userId];

  const token = jwt.sign(
    { id: req.user.id, email: req.user.email, verified: true },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    message: "OTP verified successfully",
    token,
  });
};

const verifyAuth = (req, res) => {
  res.json({
    authenticated: true,
    user: { id: req.user.id, email: req.user.email, name: req.user.name },
  });
};

module.exports = {
  login,
  generateOTP,
  verifyOTP,
  verifyAuth,
};
