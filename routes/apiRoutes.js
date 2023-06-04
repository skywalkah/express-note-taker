const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const apiRoutes = require('express').Router();

// GET request to the /api/notes endpoint. It reads the db.json file and returns all saved notes as JSON.
apiRoutes.get('/notes', (req, res) => {
    // Read the db.json file
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

// POST request to the /api/notes endpoint. It receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client.
apiRoutes.post('/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() }; // assign a unique id to the note

    // Read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'An error occurred while trying to read the notes.'
            });
        }

        // Parse the data to get an array of notes
        const notes = JSON.parse(data);
        // Add the new note to the array of notes
        notes.push(newNote);

        // Write the updated notes array to the db.json file
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

// DELETE request to the /api/notes/:id endpoint. It receives a query parameter containing the id of a note to delete. It reads all notes from the db.json file, removes the note with the given id property, and then rewrites the notes to the db.json file.
apiRoutes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    // Read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'An error occurred while trying to read the notes.'
            });
        }

        // Parse the data to get an array of notes
        let notes = JSON.parse(data);

        // Filter the notes array to the notes that do not have the id of the note to delete
        notes = notes.filter(note => note.id !== noteId);

        // Write the updated notes array to the db.json file
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