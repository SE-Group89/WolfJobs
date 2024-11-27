/* eslint-disable @typescript-eslint/no-explicit-any */
// Importing necessary utilities and constants
// 'toast' is used to display notifications (success or error messages)
// 'getFormBody' is a utility function for serializing data into a URL-encoded format
// 'loginURL' and 'signupURL' are constants holding the API URLs for login and signup endpoints
import { getFormBody } from "./apiUtils";
import { loginURL, signupURL } from "../api/constants";
import toast from "react-hot-toast";

// Function to handle user login
export async function login(email: string, password: string, navigate: any) {
  const url = loginURL; // Set the URL for the login API
  await fetch(url, {
    method: "POST", // Making a POST request
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Indicating the request body is in URL-encoded format
    },
    body: getFormBody({ email, password }), // Serializing the login data using getFormBody utility
  })
    .then((res) => res.json()) // Parsing the JSON response from the API
    .then((data) => {
      // If login is successful (based on 'data.success')
      if (data.success) {
        localStorage.setItem("token", data.data.token); // Storing the received token in localStorage for future authentication
        toast.success("User Logged in Successfully"); // Displaying a success toast notification
        navigate("/dashboard"); // Redirecting to the dashboard
        return;
      }
      // If login fails, display an error message
      toast.error("Login Failed");
    });
}

// Function to handle user signup
export async function signup(
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  role: string,
  affiliation: string,
  skills: string,
  navigate: any
) {
  const url = signupURL; // Set the URL for the signup API
  fetch(url, {
    method: "POST", // Making a POST request
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Indicating the request body is in URL-encoded format
    },
    body: getFormBody({
      email,
      password,
      confirm_password: confirmPassword, // Including the confirm password field for signup
      name,
      role,
      skills,
      affiliation,
    }), // Serializing the signup data using getFormBody utility
  })
    .then((response) => response.json()) // Parsing the JSON response from the API
    .then((data) => {
      // If signup is successful (based on 'data.success')
      if (data.success) {
        localStorage.setItem("token", data.data.token); // Storing the received token in localStorage
        toast.success("User Created Successfully"); // Displaying a success toast notification
        navigate("/dashboard"); // Redirecting to the dashboard
        return;
      }
      // If signup fails, display an error message
      toast.error("Sign up Failed");
    });
}
