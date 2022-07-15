const express = require('express');
const path = require("path");
const fs = require('fs');
const crypto = require('crypto');
const { writeToFile } = require('./utils/fsUtils');

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(JSON.parse(data));    
});

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add note`);

    // destructure title and text from the request body
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: crypto.randomBytes(2).toString("hex"), // use crypto lib to generate random id
    };
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    notes.push(newNote);
    writeToFile('./db/db.json', notes);
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    console.log(`${req.method} request received to delete note`);
    // set note id from the request parameter
    const noteId = req.params.id;
    console.log(`Deleting note with id ${noteId}`);
    // read the db data from the json file
    const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

    // Set new db data with the note id removed
    const newData = data.filter(note => {
       return note.id != noteId;
    });
    // write to file with the new db data 
    writeToFile("./db/db.json", newData);
    res.json(newData);
});
  

app.listen(PORT, () => console.log(`Server successfully listening for request on PORT ${PORT}`));
