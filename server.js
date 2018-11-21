const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = require('./app.js');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//API calls
const appConfig = require("./src/config/main-config.js");
const routeConfig = require("./src/config/route-config.js");

appConfig.init(app,express);
routeConfig.init(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));


