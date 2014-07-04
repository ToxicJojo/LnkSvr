var express = require('express');
var router = express.Router();

router.use('/register', App.require('router/register'));
router.use('/login', App.require('router/login'));

module.exports = router;
