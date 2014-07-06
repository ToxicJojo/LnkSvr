var createLink = function(linkUrl, callback, callbackError) {
  return $.ajax({
    type: 'POST',
    url: '/link',
    data: 'linkUrl=' + linkUrl,
    processData: true,
    dataType: 'json',
    success: callback,
    error: callbackError
  });
};

module.exports = createLink;
