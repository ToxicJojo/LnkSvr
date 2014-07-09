var linkApi = require('./api/link');
var notification = require('./notification');

$(document).ready(function() {
  // Bind the update of links to all checkboxes.
  $('input[type=checkbox]').bind('click', function() {
    linkApi.update(this.value, {
      viewed: this.checked
    }, function(link) {
      notification.showSuccess('Updated the link.');
    }, function(error) {
      notification.showError('Failed to update the link.');
    });
  });
});
