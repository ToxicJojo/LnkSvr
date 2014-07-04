var express = require('express'),
  controller = App.require('controllers/login'),
  router = express.Router();

router.get('/', controller.show);
router.post('/', controller.login);

module.exports = router;
