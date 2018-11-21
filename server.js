const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const staticRoutes = require("./routes/static");
const userRoutes = require("./routes/users");
const listRoutes = require("./routes/lists");
const itemRoutes = require("./routes/items");


app.use('/',staticRoutes);
app.use('/users',userRoutes);
app.use('lists',listRoutes);
app.use('/',itemRoutes);



if (process.env.NODE_ENV === 'production') {

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));


