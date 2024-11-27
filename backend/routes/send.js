// Importing required modules
const express = require("express"); // Express.js for routing and handling HTTP requests
const {
  sendJobAcceptanceEmail, // Function to send a job acceptance email
  sendJobRejectionEmail,  // Function to send a job rejection email
  sendJobSelectionEmail,  // Function to send a job selection email
  resetPassword,          // Function to handle password reset
  forgotPassword,         // Function to handle forgot password request
} = require("../controllers/email_controller"); // Importing email-related functions from the email controller

// Creating an instance of the express router
const router = express.Router();

// Defining routes for email-related actions

// Route to send a job acceptance email
router.post("/send-job-acceptance-email", sendJobAcceptanceEmail);

// Route to send a job rejection email
router.post("/send-job-rejection-email", sendJobRejectionEmail);

// Route to send a job selection email
router.post("/selection-email", sendJobSelectionEmail);

// Route to handle forgot password request (e.g., sending a reset link)
router.post("/forgot-password", forgotPassword);

// Route to handle password reset (e.g., after receiving a reset token)
router.post("/reset-password", resetPassword);

// Exporting the router so it can be used in the main app (index.js)
module.exports = router;
