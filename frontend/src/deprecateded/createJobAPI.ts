// Importing necessary modules and utilities
// 'toast' is used for displaying success/error notifications to the user
// 'createJobURL' and 'loginURL' are constants for the API endpoints
// 'getFormBody' is a utility function for serializing data into a URL-encoded format
import { toast } from "react-toastify";
import { createJobURL, loginURL } from "../api/constants";
import { getFormBody } from "./apiUtils";

// Function to handle creating a new job
export const createJob = async (
  name: string,
  id: string,
  status: string,
  location: string,
  description: string,
  pay: string,
  type: string,
  question1: string,
  question2: string,
  question3: string,
  question4: string,
  affiliation: string,
  navigate: any
) => {
  const url = createJobURL; // The URL for creating a job
  await fetch(url, {
    method: "POST", // Making a POST request to the server
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Indicating the data is URL-encoded
    },
    body: getFormBody({
      name,           // Job name
      id,             // Job ID
      status,         // Job status (active, inactive, etc.)
      location,       // Job location
      description,    // Job description
      pay,            // Salary or pay rate
      type,           // Job type (e.g., full-time, part-time)
      question1,      // Custom question for applicants
      question2,      // Custom question for applicants
      question3,      // Custom question for applicants
      question4,      // Custom question for applicants
      affiliation,    // Affiliation or company details
    }),
  })
    .then((res) => res.json()) // Parsing the response as JSON
    .then((res) => {
      // If the job is created successfully (res.success === true)
      if (res.success === true) {
        navigate("/dashboard"); // Redirecting to the dashboard
        toast.success("Job created"); // Displaying success message
      }
    });
};

// Function to handle user login
export async function login(email: string, password: string, navigate: any) {
  const url = loginURL; // The URL for logging in
  await fetch(url, {
    method: "POST", // Making a POST request to the server
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Indicating the data is URL-encoded
    },
    body: getFormBody({ email, password }), // Serializing the login data
  })
    .then((res) => res.json()) // Parsing the response as JSON
    .then((data) => {
      console.log("Login data", data); // Logging the login response (for debugging)
      // If login is successful (data.success === true)
      if (data.success) {
        localStorage.setItem("token", data.data.token); // Storing the token in localStorage
        navigate("/dashboard"); // Redirecting to the dashboard
      }
    });
}
