// Importing 'create' from 'zustand', a state management library for React
import { create } from "zustand";

// Type definition for the state of the job store
type JobState = {
  // jobList: an array of Job objects, representing the list of jobs in the store
  jobList: Job[];
};

// Type definition for the actions that can be performed on the store
type JobAction = {
  // updateJobList: A function to update the jobList state with a new list of jobs
  updateJobList: (name: JobState["jobList"]) => void;
};

// Creating the store using zustand's 'create' function
export const useJobStore = create<JobState & JobAction>()((set) => ({
  // Initial state for the job store
  jobList: [], // Start with an empty job list

  // Action to update the job list
  updateJobList: (jobList: Job[]) => {
    // 'set' is used to update the state with the new jobList
    set(() => ({ jobList: jobList }));
  },
}));
