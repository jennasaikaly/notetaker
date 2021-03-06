const express = require('express');
const { notes } = require('./data/db');
const PORT = process.env.PORT || 3001; //accessing heroku port
//instantiate's the server
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json())

// uuid
//const { v4: uuidv4 } = require('uuid');
//uuidv4();

//create new note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    // return finished code to post route for response
    return note;
}

//function to validate input
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}
// function findById(id, notesArray) {
//     const result = notesArray.filter(note => note.id === id)[0];
//     return result;
//   }

//GET routes
//creates a route that the front-end can request (get) data from
app.get('/api/notes', (req, res) => {
    //res.send("notes")
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
});

//POST ROUTE
app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);
        res.json(req.body);
    }
});

//route to serve index.HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  //route to serve notes.HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  // wildcard route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
//delete route -- will finish this some other time whenever I refactor
//   app.delete('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.json(result);
//       } else {
//         res.sendStatus(404);
//       }
// });
//makes the app listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});