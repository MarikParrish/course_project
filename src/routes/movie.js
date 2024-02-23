const express = require('express');
const router = express.Router();
const { getMovies } = require('../models/movies');

router.get('/:title', async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
        const moviesList = await getMovies([`title = '${title}'`]);

        if (moviesList.length === 0) {
            res.status(404).send('Movie not found');
            return;
        }

        
        res.render('movie', { movie: moviesList[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
