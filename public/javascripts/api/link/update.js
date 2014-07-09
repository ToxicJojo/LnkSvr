var updateLink = function(linkId, params, callback, callbackError) {
  return $.ajax({
    type: 'POST',
    url: '/link/' + linkId,
    data: params,
    processData: true,
    dataType: 'json',
    success: callback,
    error: callbackError
  });
};

module.exports = updateLink;
