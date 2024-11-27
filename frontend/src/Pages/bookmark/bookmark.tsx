import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "../../store/UserStore"; // Assuming you're using Zustand or Redux for state management
import { toast } from "react-toastify";

interface BookmarkProps {
  jobId: string; // The job ID to be bookmarked
}

const Bookmark: React.FC<BookmarkProps> = ({ jobId }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const userId = useUserStore((state) => state.id); // Assuming user is logged in and userId is available

  // Check if the job is already bookmarked
  const checkIfBookmarked = async () => {
    if (!userId || !jobId) return;

    try {
      const response = await axios.get(
        `http://localhost:8000/bookmarks/${userId}`
      );
      const bookmarkedJobs = response.data;
      const isAlreadyBookmarked = bookmarkedJobs.some(
        (bookmark: any) => bookmark.job_id._id === jobId
      );
      setIsBookmarked(isAlreadyBookmarked);
    } catch (error) {
      console.error("Error checking if job is bookmarked:", error);
    }
  };

  // Bookmark a job
  const handleBookmark = async () => {
    if (!userId || !jobId) {
      toast.warn("You need to be logged in and have a valid job.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/bookmarks",  // Backend endpoint to create bookmark
        { user_id: userId, job_id: jobId }
      );

      if (response.status === 201) {
        setIsBookmarked(true);
        toast.success("Job bookmarked successfully!");
      }
    } catch (error) {
      console.error("Error bookmarking job:", error);
      toast.error("An error occurred while bookmarking the job.");
    }
  };

  // Remove bookmark for a job
  const handleRemoveBookmark = async () => {
    if (!userId || !jobId) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/bookmarks/${userId}/${jobId}`  // Backend endpoint to remove bookmark
      );

      if (response.status === 200) {
        setIsBookmarked(false);
        toast.success("Job removed from bookmarks.");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast.error("An error occurred while removing the bookmark.");
    }
  };

  useEffect(() => {
    checkIfBookmarked();
  }, [userId, jobId]);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={isBookmarked ? handleRemoveBookmark : handleBookmark}
        className={`px-4 py-2 font-bold rounded ${isBookmarked ? 'bg-blue-500' : 'bg-green-500'} text-white`}
      >
        {isBookmarked ? "Remove Bookmark" : "Bookmark This Job"}
      </button>
    </div>
  );
};

export default Bookmark;
