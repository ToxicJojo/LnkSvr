var show = function(request, response, params) {
  response.render('home/show', params);
};

module.exports.show = show;
