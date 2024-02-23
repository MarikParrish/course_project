const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const indexRoute = require('./routes/index');
const adminRoute = require('./routes/admin');
const appPlugin = require('./plugins/app');
const adminPlugin = require('./plugins/admin');
const movieRoute = require('./routes/movie');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movie', movieRoute);
app.use('/', indexRoute);
app.use('/admin', adminRoute);
app.use('/', appPlugin);
app.use('/admin', adminPlugin);
app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.set('view engine', 'ejs');
app.set('views', path.join('src', 'views'));
app.use('/css', express.static(path.join('src', 'public/css')));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

