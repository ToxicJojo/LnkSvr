var express = require('express'),
  controller = App.require('controllers/home'),
  router = express.Router();

router.get('/', controller.show);

module.exports = router;
