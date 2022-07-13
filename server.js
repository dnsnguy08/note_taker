const express = require('express');
const path = require("path");
const fs = require('fs');

// const routes = require('./routes');
const app = express();
const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));




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
    res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
    console.log("I'M HIT!!!!!");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/notes', (req, res) => {
console.log("I'M HIT NOTES!!!");
res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.delete('/api/', (req, res) => {
    console.log("I'M HIT!!!!!");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  

app.listen(PORT, () => console.log(`Server successfully listening for request on PORT ${PORT}`));

