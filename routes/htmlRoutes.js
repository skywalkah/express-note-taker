const path = require('path');
const htmlRoutes = require('express').Router();

// GET request to the /notes endpoint. It returns the notes.html file.
htmlRoutes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET request that sends the 'index.html' in response to any GET request that hasn't been matched by other routes.
htmlRoutes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = htmlRoutes;