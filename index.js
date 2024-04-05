const express = require('express');
//const cors = require('cors'); 
const path = require('path');

const app = express(); // start server

const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc)); // setup swagger UI to test APIs

const port = 3000; // listen on this port

const key = 'AIzaSyA2-opOfeeNw2MItfgSrAxP9rtmmSbKYWs'; // api key for google books

app.use(express.static('public')); // serve static files

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

//app.use(cors()); // .use(cors()) applies to all methods, no path applies to all paths. ONLY NEED THIS IF USING MULTIPLE PORTS

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/genre-search/:genre', async (req,res) => {

    let genre = req.params.genre;
    let maxResults = 32;

    // Note: q= filters for specific words in title, author, subject (genre), etc.

    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&printType=books&maxResults=${maxResults}&key=${key}`);

    return res.json(response);
})


