const transporter = require("../config/email");

/**
 * Send OTP via email
 * @param {string} email - Recipient email address
 * @param {string} name - Recipient name
 * @param {string} otp - One-time password
 * @returns {Promise<boolean>} - Success status
 */
const sendOTPEmail = async (email, name, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Authentication",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">Authentication Code</h2>
        <p>Hello ${name},</p>
        <p>Your one-time password (OTP) for authentication is:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 5 minutes.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you,<br>Your Application Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendOTPEmail };
