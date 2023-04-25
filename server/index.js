const express = require('express');
const path = require('path');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const query = require('../database/index.js').query;
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('POST request received');
  // Get the username from request
  const username = req.body.username
  console.log(username);
  // Call github API to collect the user repos
  getReposByUsername(username)
    .then(function(response) {
      // Save in the database
      save(response.data)
      .then(() => {
        res.status(201).send();
      })
    })
    .catch((err) => {
      console.log('Error when retrieving data from Github');
      res.status(400).send();
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('GET request received');
  // Query repos from DB
  query()
    .then((docus) => {
      res.status(200).json(docus);
    })
    .catch(() => {console.log('Error when retrieving data in DB')})
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

