var linkApi = App.require('api/link');

var create = function(request, response) {
  var linkUrl = request.body.linkUrl;
  var owner = request.user.name;

  linkApi.create(linkUrl, owner, function(error, link) {
    if (error) {
      console.log(error);
      response.json(500, {
        error: 'Failed to create the link.'
      });
    } else {
      response.json(201, link);
    }
  });
};

module.exports.create = create;
