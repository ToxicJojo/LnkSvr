var express = require('express'),
  controller = App.require('controllers/link'),
  router = express.Router();

router.get('/', controller.show);
router.post('/', controller.create);
router.post('/:linkId', controller.update);

module.exports = router;
