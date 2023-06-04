const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const apiRoutes = require('express').Router();

apiRoutes.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'An error occurred while trying to read the notes.'
            });
        }
        res.json(JSON.parse(data));
    });
});

apiRoutes.post('/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() }; // assign a unique id to the note

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'An error occurred while trying to read the notes.'
            });
        }

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'An error occurred while trying to save the note.'
                });
            }

            res.json(newNote);
        });
    });
});

apiRoutes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'An error occurred while trying to read the notes.'
            });
        }

        let notes = JSON.parse(data);

        // Filter the notes array to the notes that do not have the id of the note to delete
        notes = notes.filter(note => note.id !== noteId);

        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'An error occurred while trying to delete the note.'
                });
            }
            // Send a success message or the updated note list
            res.json({ message: 'Note successfully deleted.' });
        });
    });
});

module.exports = apiRoutes;