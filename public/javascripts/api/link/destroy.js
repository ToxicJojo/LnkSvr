var destroyLink = function(linkId, callback, callbackError) {
  return $.ajax({
    type: 'POST',
    url: '/link/destroy/' + linkId,
    processData: true,
    dataType: 'json',
    success: callback,
    error: callbackError
  });
};

module.exports = destroyLink;
