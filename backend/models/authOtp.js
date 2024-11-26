const mongoose = require('mongoose'); // Importing Mongoose library for database schema and model creation

// Define schema for storing OTP (One-Time Password) data
const autoOtpSchema = new mongoose.Schema({
  userId: {    // The ID of the user associated with this OTP
    type: String, // The user ID is stored as a string (can be changed to ObjectId for relational reference)
    required: true // This field is mandatory
  },
  otp: { // The OTP value
    type: String, // OTP is stored as a string
    required: true // This field is mandatory
  },
  createdAt: { // The date and time when this OTP record was created
    type: Date, // Stores date and time
    default: Date.now // Defaults to the current date and time if not provided
  }

}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields to the schema
});

// Create the Mongoose model for the schema
// 'autoOtp' is the name of the collection in the database
const autoOtp = mongoose.model('autoOtp', autoOtpSchema);

// Export the model so it can be used in other parts of the application
module.exports = autoOtp;