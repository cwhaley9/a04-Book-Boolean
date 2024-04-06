const express = require('express');
//const cors = require('cors'); 
const path = require('path');

const app = express(); // start server

const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

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

const key = 'AIzaSyA2-opOfeeNw2MItfgSrAxP9rtmmSbKYWs'; // api key for google books

app.use(express.static('public')); // serve static files

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

/**
 * @swagger
 * /genre-search/{genre}:
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
app.get('/genre-search/:genre', async (req,res) => {

    let genre = req.params.genre;
    let maxResults = 32;

    // Note: q= filters for specific words in title, author, subject (genre), etc.

    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&printType=books&maxResults=${maxResults}&key=${key}`);

    return res.json(response);
})


