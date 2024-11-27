// Import the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for bookmarks
const bookmarkSchema = new mongoose.Schema({
    // Reference to the user who bookmarked the job
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // Reference to the bookmarked job
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    // Timestamp when the bookmark was created
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Create a Mongoose model called 'Bookmark' using the defined schema
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

// Export the Bookmark model for use in other parts of the application
module.exports = Bookmark;
