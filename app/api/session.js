var crypto = require('crypto');

var create = function(user, response, callback) {
  user.authToken = generateAuthToken();

  // Create a new session object with the username and the authToken.
  var session = {
    authToken: user.authToken,
    name: user.name
  };

  response.cookie('session', session, {
    maxAge: 365 * 24 * 60 * 60
  });

  user.save(callback);
};

// Generates a new random authToken.
var generateAuthToken = function() {
  var buff = crypto.randomBytes(64);

  var authToken = [].slice.call(buff).map(function(number) {
    return number.toString(16);
  }).join('');

  return authToken;
};

module.exports.create = create;
