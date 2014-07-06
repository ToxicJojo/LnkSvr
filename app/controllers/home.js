var show = function(request, response) {
  var params = {
    page_title: 'LnkSvr',
    user: request.user
  };
  App.require('views/home').show(request, response, params);
};

module.exports.show = show;
