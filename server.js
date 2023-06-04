const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
require('./routes')(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));