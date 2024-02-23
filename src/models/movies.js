const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getMovies = async (filterParams) => {
    try {
        let sqlQuery = 'SELECT * FROM movies';

        if (filterParams.length > 0) {
            sqlQuery += ` WHERE ${filterParams.join(' AND ')}`;
        }

        const { rows } = await pool.query(sqlQuery);
        return rows;
    } catch (error) {
        console.error('Error in getMovies:', error);
        throw error;
    }
};

const searchMoviesByTitle = async (title) => {
    try {
        const sqlQuery = `SELECT * FROM movies WHERE title ILIKE $1`;
        const { rows } = await pool.query(sqlQuery, [`%${title}%`]);
        return rows;
    } catch (error) {
        console.error('Error in searchMoviesByTitle:', error);
        throw error;
    }
};

const addMovie = async (title, genre, rating, releaseYear, imageUrl, description, country) => {
    try {
        const sqlQuery = `INSERT INTO movies (title, genre, rating, release_year, image_url, description, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const { rows } = await pool.query(sqlQuery, [title, genre, rating, releaseYear, imageUrl, description, country]);
        return rows[0];
    } catch (error) {
        console.error('Error in addMovie:', error);
        throw error;
    }
};

const deleteMovie = async (movieId) => {
    try {
        const sqlQuery = 'DELETE FROM movies WHERE id = $1';
        await pool.query(sqlQuery, [movieId]);
    } catch (error) {
        console.error('Error in deleteMovie:', error);
        throw error;
    }
};

module.exports = { getMovies, searchMoviesByTitle, addMovie, deleteMovie };