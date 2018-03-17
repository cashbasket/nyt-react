require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nytreact';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(routes);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
