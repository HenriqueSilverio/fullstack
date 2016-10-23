const mongoose = require('mongoose');
const db       = mongoose.connection;

mongoose.connect('mongodb://localhost/api');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to database!');
});
