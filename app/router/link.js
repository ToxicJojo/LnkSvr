var express = require('express'),
  controller = App.require('controllers/link'),
  router = express.Router();

router.post('/', controller.create);

module.exports = router;
