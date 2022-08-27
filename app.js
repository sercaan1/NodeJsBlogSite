const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = "mongodb+srv://sercan:1234@nodejsblogsite.zgmifjt.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then((result) => app.listen(3001))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404 Page Not Found'});
});

app.use(morgan('dev'));