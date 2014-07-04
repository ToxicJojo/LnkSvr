var User = App.require('models/user');

var authenticate = function(request, response, next) {
  var session = request.cookies.session;

  if (session) {
    //Check if the session saved in the cookie is valid.
    User.isValidSession(session, function(user) {
      if (user) {
        request.user = user;
      }
      next();
    });
  } else {
    next();
  }

};

module.exports = authenticate;
