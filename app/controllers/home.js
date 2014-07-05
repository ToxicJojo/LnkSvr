var show = function(request, response) {
  var params = {
    page_title: 'LnkSvr'
  };
  App.require('views/home').show(request, response, params);
};

var newLink = function(request, response) {



};


module.exports.show = show;
module.exports.newLink = newLink;
