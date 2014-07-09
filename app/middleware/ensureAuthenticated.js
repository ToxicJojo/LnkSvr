var ensureAthenticates = function(request, response, next) {
  // If there is no authenticated user redirect him to the login page.
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
};

module.exports = ensureAthenticates;
