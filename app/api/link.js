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

  link.save(callback);
};



module.exports.create = create;
module.exports.update = update;
