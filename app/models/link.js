var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  viewed: {
    type: Boolean,
    default: false
  },
  tags: [String]
});


// Finds all links owned by the user with the given name.
linkSchema.statics.findByUsername = function(name, callback) {
  this.find({
    owner: new RegExp(name, 'i')
  }, callback);
};


var LinkModel = mongoose.model('Link', linkSchema);

module.exports = LinkModel;
