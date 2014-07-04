var express = require('express'),
  controller = App.require('./controllers/register'),
  router = express.Router();

router.get('/', controller.show);
router.post('/', controller.registerUser);

module.exports = router;
