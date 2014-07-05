var Link = App.require('models/link');

var create = function(url, username, callback) {
  var link = new Link({
    url: url,
    owner: username
  });

  link.save(callback);
};



module.exports.create = create;
