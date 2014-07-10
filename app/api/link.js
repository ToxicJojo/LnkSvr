var Link = App.require('models/link');

var create = function(url, username, callback) {
  var link = new Link({
    url: url,
    owner: username
  });

  link.save(callback);
};

var update = function(link, params, callback) {
  if (params.viewed !== undefined) {
    link.viewed = params.viewed;
  }

  if (params.url) {
    link.url = params.url;
  }

  if (params.tags) {
    link.tags = params.tags;
  }

  if (params.notes) {
    link.notes = params.notes;
  }

  link.save(callback);
};

var destroy = function(link, callback) {
  link.remove(callback);
};



module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
