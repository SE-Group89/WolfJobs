let chai = require("chai"); // Import chai assertion library
let chaiHttp = require("chai-http"); // Import chai-http plugin for making HTTP requests in tests
let server = require("../index"); // Import the server (index.js) to test against
const { default: mongoose } = require("mongoose"); // Import mongoose for database connection management
const User = require("../models/user"); // Import the User model for reference (not used directly in this code)

// Initialize chai with the necessary plugins
chai.should();
chai.use(chaiHttp); // Use chai-http to make HTTP requests in tests

describe("Users and Jobs API", function () {
  // Set the timeout for the tests to 10 seconds
  this.timeout(10000);

  // Ensure mongoose is connected before starting tests
  before(function (done) {
    // Check if mongoose connection is ready (connected to database)
    if (mongoose.connection.readyState === 1) {
      done();
    } else {
      // Wait until mongoose connection is open or error
      mongoose.connection.once("open", done);
      mongoose.connection.on("error", done);
    }
  });

  // Test case for fetching the user profile
  describe("GET /api/v1/users/profile", () => {
    it("It should return the user profile", (done) => {
      chai
        .request("http://localhost:8000") // Make request to the local server
        .get("/api/v1/users/profile") // GET request to the user profile endpoint
        .set("Authorization", "Bearer <valid-jwt-token>") // Set Authorization header with a JWT token
        .end((err, response) => {
          if (err) return done(err); // Handle any errors that occur during the request
          response.should.have.status(200); // Assert that the status code is 200 (OK)
          response.body.should.be.a("object"); // Assert that the response body is an object
          response.body.should.have.property("name"); // Assert that the response contains a 'name' property
          response.body.should.have.property("email"); // Assert that the response contains an 'email' property
          console.log("Response:", response.body); // Log the response body
          done(); // Indicate that the test is complete
        });
    });
  });

  // Test case for updating the user profile
  describe("PUT /api/v1/users/profile", () => {
    it("It should update the user profile", (done) => {
      const updatedProfile = {
        name: "New Name", // New name to update
        skills: ["JavaScript", "Node.js"], // Updated skills
        location: "San Francisco", // New location
      };

      chai
        .request("http://localhost:8000") // Make request to the local server
        .put("/api/v1/users/profile") // PUT request to the update profile endpoint
        .set("Authorization", "Bearer <valid-jwt-token>") // Set Authorization header with a JWT token
        .send(updatedProfile) // Send the updated profile data in the request body
        .end((err, response) => {
          if (err) return done(err); // Handle any errors during the request
          response.should.have.status(200); // Assert that the status code is 200 (OK)
          response.body.should.be.a("object"); // Assert that the response body is an object
          response.body.should.have.property("message").eql("Profile updated successfully"); // Assert that the response contains a success message
          console.log("Response:", response.body); // Log the response body
          done(); // Indicate that the test is complete
        });
    });
  });

  // Test case for applying to a job
  describe("POST /api/v1/users/apply", () => {
    it("It should allow a user to apply for a job", (done) => {
      const applicationData = {
        jobId: "job456", // Job ID for the application
        resume: "resume-link", // Resume link
        coverLetter: "cover-letter-link", // Cover letter link
      };

      chai
        .request("http://localhost:8000") // Make request to the local server
        .post("/api/v1/users/apply") // POST request to the job application endpoint
        .set("Authorization", "Bearer <valid-jwt-token>") // Set Authorization header with a JWT token
        .send(applicationData) // Send the application data in the request body
        .end((err, response) => {
          if (err) return done(err); // Handle any errors during the request
          response.should.have.status(201); // Assert that the status code is 201 (Created)
          response.body.should.be.a("object"); // Assert that the response body is an object
          response.body.should.have.property("message").eql("Application submitted successfully"); // Assert that the response contains a success message
          console.log("Response:", response.body); // Log the response body
          done(); // Indicate that the test is complete
        });
    });
  });

  // Test case for fetching all users (Admin only)
  describe("GET /api/v1/admin/users", () => {
    it("It should return all registered users (Admin only)", (done) => {
      chai
        .request("http://localhost:8000") // Make request to the local server
        .get("/api/v1/admin/users") // GET request to the admin users endpoint
        .set("Authorization", "Bearer <admin-jwt-token>") // Set Authorization header with an admin JWT token
        .end((err, response) => {
          if (err) return done(err); // Handle any errors during the request
          response.should.have.status(200); // Assert that the status code is 200 (OK)
          response.body.should.be.a("array"); // Assert that the response body is an array
          console.log("Users fetched:", response.body.length); // Log the number of users fetched
          done(); // Indicate that the test is complete
        });
    });
  });

  // Test case for deleting a job (Admin privilege required)
  describe("DELETE /api/v1/admin/delete-job/:id", () => {
    it("It should delete a job by ID", (done) => {
      const jobId = "job456"; // Job ID to delete

      chai
        .request("http://localhost:8000") // Make request to the local server
        .delete(`/api/v1/admin/delete-job/${jobId}`) // DELETE request to the delete job endpoint
        .set("Authorization", "Bearer <admin-jwt-token>") // Set Authorization header with an admin JWT token
        .end((err, response) => {
          if (err) return done(err); // Handle any errors during the request
          response.should.have.status(200); // Assert that the status code is 200 (OK)
          response.body.should.be.a("object"); // Assert that the response body is an object
          response.body.should.have.property("message").eql("Job deleted successfully"); // Assert that the response contains a success message
          console.log("Response:", response.body); // Log the response body
          done(); // Indicate that the test is complete
        });
    });
  });

  // Test case for job posting analytics (Admin privilege required)
  describe("GET /api/v1/admin/job-analytics", () => {
    it("It should return job posting analytics", (done) => {
      chai
        .request("http://localhost:8000") // Make request to the local server
        .get("/api/v1/admin/job-analytics") // GET request to the job analytics endpoint
        .set("Authorization", "Bearer <admin-jwt-token>") // Set Authorization header with an admin JWT token
        .end((err, response) => {
          if (err) return done(err); // Handle any errors during the request
          response.should.have.status(200); // Assert that the status code is 200 (OK)
          response.body.should.be.a("object"); // Assert that the response body is an object
          response.body.should.have.property("totalJobs"); // Assert that the response contains the total number of jobs
          response.body.should.have.property("applications"); // Assert that the response contains the total number of applications
          console.log("Analytics:", response.body); // Log the job analytics data
          done(); // Indicate that the test is complete
        });
    });
  });

  // Test case for resetting a user's password
  describe("POST /api/v1/users/reset-password", () => {
    it("It should reset the password for a user", (done) => {
      const resetData = {
        email: "user@example.com", // User's email address for password reset
        newPassword: "NewSecurePassword123", // New password to set
      };

      chai
        .request("http://localhost:8000") // Make request to the local server
        .post("/api/v1/users/reset-password") // POST request to the reset password endpoint
        .send(resetData) // Send the reset data (email and new password) in the request body
        .end((err, response) => {
          if (err) return done(err); // Handle any errors during the request
          response.should.have.status(200); // Assert that the status code is 200 (OK)
          response.body.should.be.a("object"); // Assert that the response body is an object
          response.body.should.have.property("message").eql("Password reset successfully"); // Assert that the response contains a success message
          console.log("Response:", response.body); // Log the response body
          done(); // Indicate that the test is complete
        });
    });
  });
});
