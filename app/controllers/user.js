var User = App.require('models/user');

var create = function(name, email, encryptedPassword, callback) {
  user = new User({
    name: name,
    email: email,
    encryptedPassword: encryptedPassword
  });

  user.save(callback);
};

module.exports.create = create;
