var mongoose = require('mongoose'),
  validate = require('mongoose-validate');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validate.email, 'invalid email address']
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  authToken: String
});

// Finds the user with the given name.
userSchema.statics.findByName = function(name, callback) {
  this.findOne({
    name: new RegExp(name, 'i')
  }, callback);
};

// Finds the user with the given email.
userSchema.statics.findByMail = function(mailAdress, callback) {
  this.findOne({
    email: new RegExp(mailAdress, 'i')
  }, callback);
};

// Checks whether the given session is valid.
// A valid session has a username and the authToken that belongs to that user.
userSchema.statics.isValidSession = function(session, callback) {
  this.findByName(session.name, function(error, user) {
    if (user.name === session.name && user.authToken === session.authToken) {
      callback(user);
    } else {
      callback(false);
    }
  });
};

var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
