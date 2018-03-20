require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const socketIO = require('socket.io', {
  rememberTransport: false,
  transports: ['websocket']
});
const http = require('http');
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nytreact';

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('save', (headline) => {
    console.log(headline);
    io.sockets.emit('save', headline);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(routes);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));