const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = require('./app');
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls


if (process.env.NODE_ENV === 'production') {

  
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/public/index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));


