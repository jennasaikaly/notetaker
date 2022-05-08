const express = require('express');
//instantiate's the server
const app = express();
const { notes } = require('./data/db');



//creates a route that the front-end can request (get) data from
app.get('/api/notetaker', (req, res) => {
      //res.send("notes")
    res.json(notes);
  });

//makes the server listen
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });