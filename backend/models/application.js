// Import the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for a job application
const applicationSchema = new mongoose.Schema({
  // Reference to the job this application is for, linking to the 'Job' model
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  // Name of the job position being applied for
  jobname: {
    type: String,
    required: true, // This field is required
  },
  // Reference to the user (applicant) applying for the job, linking to the 'User' model
  applicantid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Name of the applicant
  applicantname: {
    type: String,
    required: true, // This field is required
    default: "",
  },
  // Email address of the applicant
  applicantemail: {
    type: String,
    default: "",
  },
  // Skills listed by the applicant
  applicantskills: {
    type: String,
    default: "",
  },
  // Phone number of the applicant
  phonenumber: {
    type: String,
    default: "",
  },
  // Manager ID associated with the job application (if applicable)
  managerid: {
    type: String,
    default: "",
  },
  // Address of the applicant
  address: {
    type: String,
    default: "",
  },
  // Hours of availability or working hours (if applicable)
  hours: {
    type: String,
    default: "",
  },
  // Date of birth of the applicant
  dob: {
    type: String,
    default: "",
  },
  // Gender of the applicant
  gender: {
    type: String,
    default: "",
  },
  // Status of the application (e.g., applied, under review, accepted, rejected)
  status: {
    type: String,
    default: "applied", // Default status is 'applied'
  },
  // Duplicate fields; consider removing the duplicates to avoid redundancy
  // jobname and jobid are repeated, which is unnecessary
  jobname: {
    type: String,
    required: true,
  },
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  // Answers to custom questions asked during the application process
  answer1: {
    type: String,
    default: "",
  },
  answer2: {
    type: String,
    default: "",
  },
  answer3: {
    type: String,
    default: "",
  },
  answer4: {
    type: String,
    default: "",
  },
  // Rating given to the applicant (possibly by a recruiter or system)
  rating: {
    type: String,
    default: "",
  },
});

// Create a Mongoose model called 'Application' using the defined schema
const Application = mongoose.model("Application", applicationSchema);

// Export the Application model for use in other parts of the application
module.exports = Application;
