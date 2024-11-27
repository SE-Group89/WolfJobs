const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark'); // Adjust path if necessary

// Add a bookmark
router.post('/', async (req, res) => {
    const { user_id, job_id } = req.body;

    if (!user_id || !job_id) {
        return res.status(400).json({ error: 'Missing user_id or job_id' });
    }

    try {
        const bookmark = new Bookmark({ user_id, job_id });
        await bookmark.save();
        res.status(201).json({ message: 'Job bookmarked successfully', bookmark });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save bookmark' });
    }
});

// Remove a bookmark
router.delete('/:id', async (req, res) => {
    try {
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
        if (!bookmark) {
            return res.status(404).json({ error: 'Bookmark not found' });
        }
        res.json({ message: 'Bookmark removed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove bookmark' });
    }
});

// Get all bookmarks for a user
router.get('/:user_id', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user_id: req.params.user_id }).populate('job_id');
        res.json(bookmarks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bookmarks' });
    }
});

module.exports = router;
