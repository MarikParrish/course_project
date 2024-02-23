const express = require('express');
const router = express.Router();
const { getMovies, searchMoviesByTitle } = require('../models/movies');

const genres = ['Екшн', 'Драма', 'Комедія', 'Детектив', 'Трилер', 'Фантастичний', 'Кримінальний', 'Історичний', 'Вестерн'];

router.get('/', async (req, res) => {
    try {
        const { genre, rating, title, releaseYear, decription, country } = req.query;
        const filterParams = [];

        if (genre) {
            filterParams.push(`genre = '${genre}'`);
        }

        if (rating) {
            filterParams.push(`rating >= ${rating}`);
        }

        if (releaseYear) {
            filterParams.push(`release_year = ${releaseYear}`);
        }

        if (decription) {
            filterParams.push(`decription = ${decription}`);
        }

        if (country) {
            filterParams.push(`country = ${country}`);
        }

        let moviesList;

        if (title) {
            moviesList = await searchMoviesByTitle(title);
        } else {
            moviesList = await getMovies(filterParams);
        }

        res.render('index', { movies: moviesList, genres, genre, rating, releaseYear, title, selectedGenre: genre, selectedRating: rating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
