const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Retrieve all students
router.get('/students', async (req, res) => {
    try {
        const result = await db.query('SELECT id, name, cohort, instructorid FROM student');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// POST: Add a new student
router.post('/students', async (req, res) => {
    const { name, cohort, instructorid } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO students (name, cohort, instructorid) VALUES ($1, $2, $3) RETURNING *',
            [name, cohort, instructorid]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student' });
    }
});

module.exports = router;
//need to make sure the routes and query are correct vs postico db fields