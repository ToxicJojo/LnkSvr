var mongoose = require('mongoose');

function connect(connectionString, callback) {
  mongoose.connect(connectionString);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));

  db.once('open', function() {
    console.log('Mongoose connected at: ', connectionString);
    callback();
  });
}

module.exports = connect;
