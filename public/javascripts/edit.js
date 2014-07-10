var linkApi = require('./api/link');
var notification = require('./notification');
var linkId = $('#linkId').val();


var addTag = function() {
  var tag = $('#newTagInput').val();

  // Don't add an empty tag.
  if (tag !== '') {
    var html = '<h3 class="tag" data-type="tag" data-value="' + tag + '">';
    html += '<span class="label label-default">' + tag + ' ';
    html += '<i class="fa fa-times" data-type="removeTag"></i>';
    html += '</span></h3>';
    // Add the tag to the list.
    $('#tagList').append(html);
    $('#newTagInput').val('');
    $('i[data-type=removeTag]').bind('click', removeTag);
  }
};

var removeTag = function() {
  this.parentNode.parentNode.remove();
};

var destroyLink = function() {
  linkApi.destroy(linkId, function(link) {
    window.location = '/link';
  }, function(error) {
    notification.showError('Failed to delete the link.');
  });
};

var updateViewed = function() {
  var viewed = $('#viewedCheckbox').attr('value');

  if (viewed === 'false') {
    $('#viewedCheckbox').removeClass('fa-square-o');
    $('#viewedCheckbox').addClass('fa-check-square-o');
    $('#viewedCheckbox').attr('value', 'true');
  } else {
    $('#viewedCheckbox').removeClass('fa-check-square-o');
    $('#viewedCheckbox').addClass('fa-square-o');
    $('#viewedCheckbox').attr('value', 'false');
  }
};


var saveChanges = function() {
  // Diable the save button and add a spinnig icon to indicate progress.
  $('#saveButton').addClass('disabled');
  $('#saveText').html('Saving');
  $('#saveSpinner').removeClass('hidden');

  var params = {};
  // Build the list of parameters.
  params.url = $('#urlInput').val();
  params.viewed = $('#viewedCheckbox').attr('value');
  params.tags = [];
  // Loop through the tags and get the tag saved in the data-value field.
  var tags = $('h3[data-type=tag]');
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i].getAttribute('data-value');
    params.tags[i] = tag;
  }

  params.notes = $('#notesInput').val();

  // Send the request to the the api.
  linkApi.update(linkId, params, function(link) {
    notification.showSuccess('Updated the link.');
    $('#saveButton').removeClass('disabled');
    $('#saveText').html('Save');
    $('#saveSpinner').addClass('hidden');
  }, function(error) {
    notification.showError('Failed to update the link.');
    $('#saveButton').removeClass('disabled');
    $('#saveText').html('Save');
    $('#saveSpinner').addClass('hidden');
  });
};


$(document).ready(function() {
  $('#deleteLinkButton').bind('click', destroyLink);
  $('#viewedCheckbox').bind('click', updateViewed);

  $('i[data-type=removeTag]').bind('click', removeTag);

  $('#addTagButton').bind('click', addTag);
  $('#saveButton').bind('click', saveChanges);
});
