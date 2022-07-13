const express = require('express');
const path = require("path");
const fs = require('fs');
const crypto = require('crypto');
const { readFromFile, readAndAppend } = require('./utils/fsUtils');

// const routes = require('./routes');
const app = express();
// const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// , (err, data) => {
//     return res.status(400).json({err});
// });



// Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(routes);

const PORT = 3001;


app.get('/notes', (req, res) => {
  console.log("I'M HIT NOTES!!!");
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/', (req, res) => {
    console.log("I'M HIT!!!!!");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    // const {note} = req.body;
    // res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
    const { id } = req.body;
    console.log("I'M HIT!!!!!");
    readFromFile('./db/db.json').then((id) => res.json(JSON.parse(id)));
});

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add note`);
    console.log(req.body);
    
    const { title, text, id } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: crypto.randomBytes(2).toString("hex"),
        };
        readAndAppend(newNote, './db/db.json');
    } else {
        res.error('Error adding note');
    }
// const newNote = req.body;
// data.push(newNote)
// res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.delete('/api/', (req, res) => {
    console.log("I'M HIT!!!!!");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  

app.listen(PORT, () => console.log(`Server successfully listening for request on PORT ${PORT}`));

