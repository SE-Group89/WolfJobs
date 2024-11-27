let chai = require('chai'); // Import chai assertion library
let chaiHttp = require('chai-http'); // Import chai-http plugin for making HTTP requests in tests
let server = require('../index'); // Import the server (index.js) to test against

chai.should(); // Initialize chai for assertions

chai.use(chaiHttp); // Use chai-http to make HTTP requests in tests

// Describe the "Tasks API" test suite
describe('Tasks API', () => {

    // Test case for fetching all applications of the user
    describe("GET /api/v1/users/fetchapplications", () => {

        it("IT SHOULD RETURN ALL THE APPLICATIONS", (done) => {
            // Make a GET request to fetch all applications of the user
            chai.request('http://localhost:8000')
                .get("/api/v1/users/fetchapplications") // Endpoint to fetch applications
                .end((err, response) => {
                    response.body.should.be.a('object'); // Assert that the response body is an object
                    console.log('*********', response.body); // Log the response body
                    done(); // Indicate that the test is complete
                });
        });

    });

    // Test case for fetching all jobs
    describe("GET /api/v1/users/", () => {

        it("IT SHOULD RETURN ALL THE JOBS", (done) => {
            // Make a GET request to fetch all jobs
            chai.request('http://localhost:8000')
                .get("/api/v1/users/") // Endpoint to fetch jobs
                .end((err, response) => {
                    response.body.should.be.a('object'); // Assert that the response body is an object
                    console.log('*********', response.body); // Log the response body
                    done(); // Indicate that the test is complete
                });
        });

    });

    // Another test case for fetching all jobs (duplicated)
    describe("GET /api/v1/users/", () => {

        it("IT SHOULD RETURN ALL THE JOBS", (done) => {
            // Make a GET request to fetch all jobs
            chai.request('http://localhost:8000')
                .get("/api/v1/users/") // Endpoint to fetch jobs
                .end((err, response) => {
                    response.body.should.be.a('object'); // Assert that the response body is an object
                    console.log('*********', response.body); // Log the response body
                    done(); // Indicate that the test is complete
                });
        });

    });

    // Test case for creating a job
    describe("POST /api/v1/users/createjob", () => {

        it("IT SHOULD RETURN THE JOB", (done) => {
            // Define the job data to be sent in the request
            const body = {
                name: 'Shaan', // Job name
                managerid: '1234556', // Manager ID for the job
                skills: 'C,java', // Skills required for the job
                location: 'Noida', // Location of the job
                description: 'xyz', // Job description
                pay: '10', // Job pay
                schedule: '10/10/10', // Job schedule
            };

            // Make a POST request to create a job
            chai.request('http://localhost:8000')
                .post("/api/v1/users/createjob") // Endpoint to create a job
                .send(body) // Send the job data in the request body
                .end((err, response) => {
                    response.body.should.be.a('object'); // Assert that the response body is an object
                    console.log('*********', response.body); // Log the response body
                    done(); // Indicate that the test is complete
                });
        });

    });

    // Test case for searching a job
    describe("GET /api/v1/users/search", () => {

        it("IT SHOULD RETURN THE SEARCHED JOB", (done) => {
            // Make a GET request to search for a job with the keyword "TA"
            chai.request('http://localhost:8000')
                .get("/api/v1/users/search/TA") // Endpoint to search jobs
                .end((err, response) => {
                    response.body.should.be.a('object'); // Assert that the response body is an object
                    console.log('*********', response.body.users); // Log the search results (list of jobs)
                    done(); // Indicate that the test is complete
                });
        });

    });

    // Test case for creating a user session (login)
    describe("POST /api/v1/users/create-session", () => {

        it("IT SHOULD RETURN THE USER", (done) => {
            // Define the user login data
            const body = {
                email: 'boss@gmail.com', // User email for login
                password: '123', // User password for login
            };

            // Make a POST request to create a session (login)
            chai.request('http://localhost:8000')
                .post("/api/v1/users/create-session") // Endpoint to create a session
                .send(body) // Send the login data in the request body
                .end((err, response) => {
                    response.body.should.be.a('object'); // Assert that the response body is an object
                    console.log('*********', response.body); // Log the response body
                    done(); // Indicate that the test is complete
                });
        });

    });

});
