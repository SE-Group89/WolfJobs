// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for tracking user history related to calorie management
const historySchema = new mongoose.Schema({
    // Date of the history entry
    date: {
        type: String,            // Data type is String (consider using Date type for better handling of dates)
        required: true           // This field is required (cannot be empty)
    },
    // Calories gained by the user on the given date
    caloriesgain: {
        type: Number,            // Data type is Number
        default: 0               // Default value is 0 if not provided
    },
    // Calories burned by the user on the given date
    caloriesburn: {
        type: Number,            // Data type is Number
        default: 0               // Default value is 0 if not provided
    },
    // Reference to the user associated with this history entry
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Data type is ObjectId (links to another document)
        ref: 'User'                            // Refers to the 'User' model, establishing a relationship
    }
});

// Create a Mongoose model called 'History' using the defined schema
const History = mongoose.model('History', historySchema);

// Export the History model for use in other parts of the application
module.exports = History;
