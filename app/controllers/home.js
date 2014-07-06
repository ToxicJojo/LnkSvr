var show = function(request, response) {
  var params = {
    page_title: 'LnkSvr'
  };
  App.require('views/home').show(request, response, params);
};

module.exports.show = show;
