const express = require('express');
//const cors = require('cors'); 
const path = require('path');

const app = express(); // start server

const port = 3000; // listen on this port

app.use(express.static('public')); // serve static files

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

//app.use(cors()); // .use(cors()) applies to all methods, no path applies to all paths. ONLY NEED THIS IF USING MULTIPLE PORTS

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
