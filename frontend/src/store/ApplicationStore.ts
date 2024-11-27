// Import zustand for state management
import { create } from "zustand";

// Define the shape of the application state
type ApplicationState = {
  applicationList: Application[];  // List of applications, with each application of type 'Application'
};

// Define actions for updating the application state
type ApplicationAction = {
  updateApplicationList: (applicationList: ApplicationState["applicationList"]) => void;  // Action to update the application list
};

// Create the zustand store combining state and actions for managing applications
export const useApplicationStore = create<
  ApplicationState & ApplicationAction  // Define the store combining state and actions
>()((set) => ({
  applicationList: [],  // Initial state: empty application list

  // Action to update the application list state
  updateApplicationList: (applicationList: Application[]) => {
    set(() => ({ applicationList: applicationList }));  // Update the application list with the new value
  },
}));
