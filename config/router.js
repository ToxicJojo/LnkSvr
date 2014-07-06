var express = require('express');
var router = express.Router();

router.use('/', App.require('router/home'));
router.use('/register', App.require('router/register'));
router.use('/login', App.require('router/login'));
router.use('/link', App.require('router/link'));

module.exports = router;
