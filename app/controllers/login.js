var bcrypt = require('bcrypt');
var User = App.require('models/user');
var sessionApi = App.require('api/session');

var show = function(request, response) {
  var params = {
    page_title: 'LnkSvr - Login',
    user: request.user,
    loginStatus: request.query.status
  };

  if (request.query.status === 'failed') {
    params.notification = {
      type: 'danger',
      message: 'Failed to sign in. Please check your username and password.'
    };
  }

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
          sessionApi.create(user, response, function(error, user) {
            response.redirect('/');
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

var logout = function(request, response) {
  sessionApi.destroy(response);
  response.redirect('/login');
};

var loginFailed = function(request, response) {
  response.redirect('/login?status=failed');
};

module.exports.show = show;
module.exports.login = login;
module.exports.logout = logout;
