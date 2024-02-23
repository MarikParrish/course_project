const express = require('express');
const router = express.Router();
const { getMovies } = require('../models/movies');

router.get('/movies', async (req, res) => {
    try {
        const { genre, rating } = req.query;
        const filterParams = [];

        if (genre) {
            filterParams.push(`genre = '${genre}'`);
        }

        if (rating) {
            filterParams.push(`rating = ${rating}`);
        }

        const moviesList = await getMovies(filterParams);
        res.json(moviesList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;