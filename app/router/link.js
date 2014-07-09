var express = require('express'),
  controller = App.require('controllers/link'),
  router = express.Router(),
  ensureAuthenticated = App.require('middleware/ensureAuthenticated');

router.use(ensureAuthenticated);
router.get('/', controller.show);
router.post('/', controller.create);
router.post('/:linkId', controller.update);

module.exports = router;
