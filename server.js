const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();;
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
const appConfig = require("./src/config/main-config.js");
const routeConfig = require("./src/config/route-config.js");

routeConfig.init(app);
appConfig.init(app,express);

if (process.env.NODE_ENV === 'production') {

  
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;


