var linkApi = require('./api/link');
var notification = require('./notification');

$(document).ready(function() {
  $('#saveLinkButton').bind('click', function() {
    // Show the spinner.
    $('#statusIcon').removeClass();
    $('#statusIcon').addClass('fa fa-spinner fa-spin');

    var linkUrl = $('#linkInput').val();
    linkApi.create(linkUrl, function(link) {
      // Show the success icon.
      $('#statusIcon').removeClass();
      $('#statusIcon').addClass('fa fa-check');
    }, function(error) {
      //Show the error icon and display a error message.
      $('#statusIcon').removeClass();
      $('#statusIcon').addClass('fa fa-warning');
      notification.showError('Failed to save the link.');
    });
  });
});
