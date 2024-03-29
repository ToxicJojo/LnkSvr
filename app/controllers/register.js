var bcrypt = require('bcrypt'),
  userApi = App.require('api/user'),
  sessionApi = App.require('api/session');

var show = function(request, response) {
  var params = {
    page_title: 'LnkSvr - Register',
    user: request.user
  };
  App.require('views/register').show(request, response, params);
};

var registerUser = function(request, response) {
  // Hash the password.
  bcrypt.hash(request.body.password, 10, function(err, hash) {
    var username = request.body.username;
    var email = request.body.email;
    var encrypted_password = hash;

    // Let the userController create the new user.
    var user = userApi.create(username, email, encrypted_password, function(error, user) {
      if (error) {
        console.log(error);
        // TODO display an error message to the user.
        response.redirect('/register');
      } else {
        // Sign in the user  and redirect him to the dashboard.
        sessionApi.create(user, response, function() {
          response.redirect('/dashboard');
        });
      }
    });
  });
};


module.exports.show = show;
module.exports.registerUser = registerUser;
