// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for storing resumes
const resumeSchema = new mongoose.Schema({
  // Reference to the applicant (User) who uploaded the resume
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,  // Data type is ObjectId (links to another document)
    required: true,                        // This field is required (cannot be empty)
    ref: 'User'                            // References the 'User' model to establish a relationship
  },
  // Name of the uploaded resume file
  fileName: {
    type: String,                          // Data type is String
    required: true                         // This field is required
  },
  // Binary data of the resume file (stored as a buffer)
  fileData: {
    type: Buffer,                          // Data type is Buffer to store binary file data
    required: true                         // This field is required
  },
  // MIME type of the resume file (e.g., 'application/pdf')
  contentType: {
    type: String,                          // Data type is String
    required: true,                        // This field is required
    default: 'application/pdf'             // Default MIME type is 'application/pdf'
  },
  // Timestamp indicating when the resume was uploaded
  uploadedAt: {
    type: Date,                            // Data type is Date
    default: Date.now                      // Default value is the current date and time
  }
});

// Create a Mongoose model called 'Resume' using the defined schema
const Resume = mongoose.model('Resume', resumeSchema);

// Export the Resume model for use in other parts of the application
module.exports = Resume;
