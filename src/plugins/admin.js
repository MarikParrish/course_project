const express = require('express');
const router = express.Router();
const { getMovies } = require('../models/movies');

router.post('/add', async (req, res) => {
    try {
        const { title, genre, rating, releaseYear, description, country } = req.body;

        if (!title || !releaseYear || isNaN(parseFloat(rating))) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const insertQuery = `
            INSERT INTO movies (title, genre, rating, release_year, description, country)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const values = [title, genre || null, parseFloat(rating), parseInt(releaseYear), description, country];

        const { rows } = await pool.query(insertQuery, values);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;