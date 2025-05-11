const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Retrieve all instructors
router.get('/instructors', async (req, res) => {
    try {
        const result = await db.query('SELECT id, username, password FROM instructor');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch instructors' });
    }
});

// POST: Add a new instructor
router.post('/instructors', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO instructor (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create instructor' });
    }
});

module.exports = router;