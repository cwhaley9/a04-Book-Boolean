const express = require('express');
const path = require('path');
const axios = require('axios');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express(); // start server

// Define options for swagger-jsdoc
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Book Boolean API',
        version: '1.0.0',
        description: 'Test fetches coming from Google Books APIs',
        },
    },
    apis: ['./index.js'], // Path to the API routes in your project
};

const specs = swaggerJSDoc(options); // initialize swaggerJSDoc
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs)); // setup swagger UI to test APIs

const port = 3000; // listen on this port

const key = 'AIzaSyA2-opOfeeNw2MItfgSrAxP9rtmmSbKYWs'; // api key for google books and GIFs

app.use(express.static('public')); // serve static files
app.use(express.json());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

/**
 * @swagger
 * /books/{genre}:
 *   get:
 *     summary: Search for books by genre
 *     description: Retrieve a list of books based on the specified genre.
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         schema:
 *           type: string
 *         description: The genre to search for.
 *     responses:
 *       '200':
 *         description: A list of books matching the specified genre.
 */

// This is my 1st 3rd-party API
app.get('/books/:genre', async (req,res) => {

    let genre = req.params.genre;
    let maxResults = 32;

    // Note: q= filters for specific words in title, author, subject (genre), etc.

    let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&printType=books&maxResults=${maxResults}&key=${key}`);

    if(response.data.totalItems == 0){ // No books exist in this genre
        return res.json([]);
    }

    if(response.status < 200 || response.status >= 300){

        throw new Error(`Error: Response status -> ${response.status}`); // something went wrong with fetching the books, throw an error

    } 

    let books = response.data.items;
    return res.json(books);
})

// This is my 2nd 3rd-party API
app.get('/random-gif', async (req, res) => {
    let response = await axios.get(`https://tenor.googleapis.com/v2/search?q=celebration&key=${key}&limit=50`);
    let responseResults = response.data.results;
    
    let randomInt = Math.floor(Math.random() * responseResults.length)
    let randomGif = responseResults[randomInt].media_formats.gif;

    console.log(randomGif);
    res.json(randomGif);
})

app.get('/tournament', (req, res) => {
    const filepath = path.join(__dirname, 'public', 'tournament.html');
    res.sendFile(filepath);
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})



