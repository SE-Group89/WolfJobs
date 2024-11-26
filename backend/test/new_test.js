let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");

chai.should();
chai.use(chaiHttp);

describe("Users and Jobs API", function () {
  this.timeout(10000);

  before(function (done) {
    if (mongoose.connection.readyState === 1) {
      done();
    } else {
      mongoose.connection.once("open", done);
      mongoose.connection.on("error", done);
    }
  });

  // Test for fetching user profile
  describe("GET /api/v1/users/profile", () => {
    it("It should return the user profile", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/profile")
        .set("Authorization", "Bearer <valid-jwt-token>")
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("name");
          response.body.should.have.property("email");
          console.log("Response:", response.body);
          done();
        });
    });
  });

  // Test for updating user profile
  describe("PUT /api/v1/users/profile", () => {
    it("It should update the user profile", (done) => {
      const updatedProfile = {
        name: "New Name",
        skills: ["JavaScript", "Node.js"],
        location: "San Francisco",
      };

      chai
        .request("http://localhost:8000")
        .put("/api/v1/users/profile")
        .set("Authorization", "Bearer <valid-jwt-token>")
        .send(updatedProfile)
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eql("Profile updated successfully");
          console.log("Response:", response.body);
          done();
        });
    });
  });

  // Test for applying to a job
  describe("POST /api/v1/users/apply", () => {
    it("It should allow a user to apply for a job", (done) => {
      const applicationData = {
        jobId: "job456",
        resume: "resume-link",
        coverLetter: "cover-letter-link",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/apply")
        .set("Authorization", "Bearer <valid-jwt-token>")
        .send(applicationData)
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eql("Application submitted successfully");
          console.log("Response:", response.body);
          done();
        });
    });
  });

  // Test for fetching all users
  describe("GET /api/v1/admin/users", () => {
    it("It should return all registered users (Admin only)", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/admin/users")
        .set("Authorization", "Bearer <admin-jwt-token>")
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          response.body.should.be.a("array");
          console.log("Users fetched:", response.body.length);
          done();
        });
    });
  });

  // Test for deleting a job (Admin privilege)
  describe("DELETE /api/v1/admin/delete-job/:id", () => {
    it("It should delete a job by ID", (done) => {
      const jobId = "job456";

      chai
        .request("http://localhost:8000")
        .delete(`/api/v1/admin/delete-job/${jobId}`)
        .set("Authorization", "Bearer <admin-jwt-token>")
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eql("Job deleted successfully");
          console.log("Response:", response.body);
          done();
        });
    });
  });

  // Test for job posting analytics (Admin privilege)
  describe("GET /api/v1/admin/job-analytics", () => {
    it("It should return job posting analytics", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/admin/job-analytics")
        .set("Authorization", "Bearer <admin-jwt-token>")
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("totalJobs");
          response.body.should.have.property("applications");
          console.log("Analytics:", response.body);
          done();
        });
    });
  });

  // Test for resetting a password
  describe("POST /api/v1/users/reset-password", () => {
    it("It should reset the password for a user", (done) => {
      const resetData = {
        email: "user@example.com",
        newPassword: "NewSecurePassword123",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/reset-password")
        .send(resetData)
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eql("Password reset successfully");
          console.log("Response:", response.body);
          done();
        });
    });
  });
});
