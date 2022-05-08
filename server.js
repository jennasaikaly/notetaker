const express = require('express');
//tells the app to use the port that Heroku apps serve from 
const PORT = process.env.PORT || 3001;
//instantiate's the server
const app = express();
const { notes } = require('./data/db');



//creates a route that the front-end can request (get) data from
app.get('/api/notetaker', (req, res) => {
      //res.send("notes")
    res.json(notes);
  });

//makes the app listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });