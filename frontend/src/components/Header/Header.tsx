import { useUserStore } from "../../store/UserStore"; // Import the user store for managing user state
import NavBar from "./NavBar"; // Import the main navigation bar component
import NavBarItem from "./NavBarItem"; // Import individual navigation bar item component

const Header = () => {
  // Get user state from the store
  const isLoggedIn = useUserStore((state) => state.isLoggedIn); // Check if the user is logged in
  const role = useUserStore((state) => state.role); // Get the user's role (e.g., Manager, Applicant)

  return (
    <>
      {/* Sticky header with responsive design and background blur support */}
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white supports-backdrop-blur:bg-white/95">
        <div className="max-w-8xl mx-auto">
          {/* Header container with padding and border */}
          <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
            <div className="relative flex items-center">
              {/* Logo linking to either dashboard or home page based on login status */}
              <a
                className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
                href={isLoggedIn ? "/dashboard" : "/"}
              >
                <img
                  alt="logo"
                  src="/images/wolfjobs-logo.png"
                  className="h-10 p-0"
                />
              </a>

              {/* Dynamic navigation links based on user role */}
              <ul className="ml-4 flex space-x-8">
                {role == "Manager" && isLoggedIn && (
                  <NavBarItem link="/dashboard" text="My Listings" />
                )}
                {role == "Applicant" && isLoggedIn && (
                  <NavBarItem link="/dashboard" text="My Applications" />
                )}
                {isLoggedIn && <NavBarItem link="/explore" text="All jobs" />}
              </ul>

              {/* Main navigation bar */}
              <NavBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; // Export the Header component
