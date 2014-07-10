var linkApi = App.require('api/link');
var Link = App.require('models/link');

// Shows the list of links saved by the user.
var show = function(request, response) {
  Link.findByUsername(request.user.name, function(error, links) {
    var params = {
      page_title: 'LnkSvr - Links',
      links: links,
      user: request.user
    };

    App.require('views/link').show(request, response, params);
  });
};

// Creates a new link.
var create = function(request, response) {
  var linkUrl = request.body.linkUrl;
  var owner = request.user.name;

  linkApi.create(linkUrl, owner, function(error, link) {
    if (error) {
      // If we fail to create the link send a 500 response.
      response.json(500, {
        error: 'Failed to create the link.'
      });
    } else {
      // Send a 201 response containint the link.
      response.json(201, link);
    }
  });
};

// Updates a existing link.
var update = function(request, response) {
  var linkId = request.params.linkId;

  Link.findById(linkId, function(err, link) {
    //Only update the link if the user owning the link issued the request.
    if (request.user.name === link.owner) {
      linkApi.update(link, request.body, function(error, link) {
        response.json(200, link);
      });
    } else {
      response.send(401);
    }
  });
};

var destroy = function(request, response) {
  var linkId = request.params.linkId;

  Link.findById(linkId, function(err, link) {
    //Only destroy the link if the user owning the link issued the request.
    if (request.user.name === link.owner) {
      linkApi.destroy(link, function(error, link) {
        response.json(200, link);
      });
    } else {
      response.send(401);
    }
  });
};

var showEdit = function(request, response) {
  var linkId = request.params.linkId;

  Link.findById(linkId, function(err, link) {
    var params = {
      page_title: 'LnkSvr - Edit',
      link: link,
      user: request.user
    };

    App.require('views/link').showEdit(request, response, params);
  });
};

module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.showEdit = showEdit;
module.exports.destroy = destroy;
