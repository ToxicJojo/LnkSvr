var bcrypt = require('bcrypt');
var User = App.require('models/user');
var sessionController = App.require('controllers/session');

var show = function(request, response) {
  var params = {
    page_title: 'LnkSvr - Login',
    loginStatus: request.query.status,
    notification: {
      type: 'error',
      message: 'Failed to sign in. Please check your username and password.'
    }
  };
  App.require('views/login').show(request, response, params);
};


var login = function(request, response) {
  User.findByName(request.body.username, function(error, user) {
    if (error) {
      console.log(error);
      // TODO display an error to the User.
      response.redirect('/login');
    } else if (user) {
      // Check if the password is right.
      bcrypt.compare(request.body.password, user.encryptedPassword, function(error, result) {
        if (result) {
          // Login successfull.
          // Create a new session and redirect the user to the dashboard.
          sessionController.create(user, response, function(error, user) {
            response.redirect('/dashboard');
          });
        } else {
          // Wrong password.
          loginFailed(request, response);
        }
      });

    } else {
      // No user with the given name was found.
      loginFailed(request, response);
    }
  });
};

var loginFailed = function(request, response) {
  response.redirect('/login?status=failed');
};

module.exports.show = show;
module.exports.login = login;
