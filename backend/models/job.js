// Import the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for a job posting
const jobSchema = new mongoose.Schema({
  // Name or title of the job position
  name: {
    type: String,            // Data type is String
    required: true           // This field is required (cannot be empty)
  },
  // ID of the manager responsible for this job posting
  managerid: {
    type: String,            // Data type is String (consider using ObjectId if referencing a User model)
    required: true           // This field is required
  },
  // Affiliation or department of the manager
  managerAffilication: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  // Status of the job posting (e.g., open, closed, filled)
  status: {
    type: String,            // Data type is String
    default: 'open'          // Default status is 'open' if not specified
  },
  // Location where the job is based
  location: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  // Detailed description of the job role and responsibilities
  description: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  // Pay or salary information for the job
  pay: {
    type: String,            // Data type is String (consider using Number if appropriate)
    required: true           // This field is required
  },
  // Skills required for the job position
  requiredSkills: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  // Type of job (e.g., full-time, part-time, contract)
  type: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  // Custom questions for applicants to answer during the application process
  question1: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  question2: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  question3: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
  question4: {
    type: String,            // Data type is String
    required: true           // This field is required
  },
});

// Create a Mongoose model called 'Job' using the defined schema
const Job = mongoose.model("Job", jobSchema);

// Export the Job model for use in other parts of the application
module.exports = Job;
