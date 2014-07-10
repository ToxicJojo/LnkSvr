var show = function(request, response, params) {
  response.render('link/show', params);
};

var showEdit = function(request, response, params) {
  response.render('link/edit', params);
};

module.exports.show = show;
module.exports.showEdit = showEdit;
