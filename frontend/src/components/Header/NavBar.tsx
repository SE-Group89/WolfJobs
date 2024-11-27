import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from "../../store/UserStore"; // Import the user store for managing user state
import NavBarItem from "./NavBarItem"; // Import individual navigation bar item component

const NavBar = () => {
  // Get user state from the store
  const isLoggedIn = useUserStore((state) => state.isLoggedIn); // Check if the user is logged in
  const role = useUserStore((state) => state.role); // Get the user's role (e.g., Applicant)

  const [notificationCount, setNotificationCount] = useState(0); // State to track notification count

  useEffect(() => {
    // Fetch notifications if the user is logged in and is an Applicant
    if (isLoggedIn && role === "Applicant") {
      axios.get('http://localhost:8000/api/v1/users/fetchapplications')
        .then((res) => {
          if (res.status === 200) {
            const applications = res.data.application; // Extract applications from API response
            // Calculate the count of accepted and rejected applications
            const acceptedCount = applications.filter(app => app.status === 'accepted').length;
            const rejectedCount = applications.filter(app => app.status === 'rejected').length;
            setNotificationCount(acceptedCount + rejectedCount); // Update the notification count state
          }
        })
        .catch((error) => {
          console.error('Error fetching applications:', error); // Log error if API call fails
        });
    }
  }, [isLoggedIn, role]); // Dependency array ensures effect runs when isLoggedIn or role changes

  return (
    <>
      {/* Navigation bar container */}
      <div className="relative items-center hidden ml-auto lg:flex">
        <nav className="text-sm font-semibold leading-6 text-slate-700 ">
          <ul className="flex space-x-8">
            {/* Render navigation items based on user login status and role */}
            {isLoggedIn && <NavBarItem link="/profile" text="Profile" />} 
            {isLoggedIn && role == "Applicant" && <NavBarItem link="/resume" text="Upload Resume" />}
            {isLoggedIn && role === "Applicant" && <NavBarItem link="/notifications" text={`Notifications (${notificationCount})`} />}
            {isLoggedIn && <NavBarItem link="/logout" text="Log Out" />}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar; // Export the NavBar component
