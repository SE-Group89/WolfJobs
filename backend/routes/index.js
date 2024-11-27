const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);

// Existing routes
router.use('/users', require('./users'));
router.use('/api', require('./api'));

// Add this line for bookmark routes
router.use('/bookmarks', require('./bookmarks')); // Linking to bookmarks.js

module.exports = router;
