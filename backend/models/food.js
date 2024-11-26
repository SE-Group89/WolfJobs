// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for a food item
const foodSchema = new mongoose.Schema({
    // Name of the food item
    Food: {
        type: String,         // Data type is String
        required: true        // This field is required (cannot be empty)
    },
    // Caloric content of the food item
    Calories: {
        type: String,         // Data type is String (consider using Number if appropriate)
        // This field is optional, so no 'required' attribute is set
    }
});

// Create a Mongoose model called 'Food' using the defined schema
const Food = mongoose.model('Food', foodSchema);

// Export the Food model for use in other parts of the application
module.exports = Food;
