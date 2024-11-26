// Import the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for storing user information
const userSchema = new mongoose.Schema(
  {
    // User's email address (must be unique)
    email: {
      type: String,            // Data type is String
      required: true,          // This field is required (cannot be empty)
      unique: true             // Ensures each email is unique in the database
    },
    // Verification status of the user's account
    isVerified: {
      type: Boolean,           // Data type is Boolean
      default: true            // Default value is true (user is verified)
    },
    // User's password (hashed before storing in production)
    password: {
      type: String,            // Data type is String
      required: true           // This field is required
    },
    // User's full name
    name: {
      type: String,            // Data type is String
      required: true           // This field is required
    },
    // Role of the user (e.g., applicant, recruiter, admin)
    role: {
      type: String,            // Data type is String
      required: true           // This field is required
    },
    // User's address (optional)
    address: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // User's phone number (optional)
    phonenumber: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // Number of hours available or worked by the user (optional)
    hours: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // User's date of birth (optional)
    dob: {
      type: Date               // Data type is Date
    },
    // User's gender (optional)
    gender: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // User's availability status (e.g., part-time, full-time)
    availability: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // User's affiliation (e.g., university, company)
    affiliation: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // User's skills (comma-separated or single string)
    skills: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // Resume file path or URL (optional)
    resume: {
      type: String,            // Data type is String
      default: ""              // Default value is an empty string
    },
    // Reference to the resume document in the 'Resume' collection
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,  // Data type is ObjectId (links to another document)
      required: false,                       // This field is optional
      ref: 'Resume'                          // References the 'Resume' model to establish a relationship
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' timestamps to each document
    timestamps: true
  }
);

// Create a Mongoose model called 'User' using the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
