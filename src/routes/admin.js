const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addMovie, getMovies, searchMoviesByTitle, deleteMovie } = require('../models/movies'); 

const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
    try {
        const movies = await getMovies([]);
        res.render('admin', { movies });
    } catch (error) {
        console.error('Error in GET /admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add-movie', upload.single('image'), async (req, res) => {
    try {
        const { title, genre, rating, releaseYear, description, country } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        if (!title || !genre || !rating || !releaseYear || !imageUrl || !description || !country) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await addMovie(title, genre, parseFloat(rating), parseInt(releaseYear), imageUrl, description, country);

        res.redirect('/admin');
    } catch (error) {
        console.error('Error in POST /admin/add-movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/delete-movie', async (req, res) => {
    try {
        const { movieId } = req.body;

        if (!movieId) {
            return res.status(400).json({ error: 'Movie ID is required' });
        }

        await deleteMovie(movieId);

        res.redirect('/admin');
    } catch (error) {
        console.error('Error in POST /admin/delete-movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;