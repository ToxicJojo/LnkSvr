var env = process.env.NODE_ENV || 'development',
  packageJson = require('../package.json'),
  path = require('path'),
  express = require('express');

console.log('Loading App in ' + env + ' mode.');

global.App = {
  app: express(),
  port: process.env.PORT || 3000,
  version: packageJson.version,
  root: path.join(__dirname, '../app'),
  appPath: function(path) {
    return this.root + '/' + path;
  },
  require: function(path) {
    return require(this.appPath(path));
  },
  env: env,
  start: function() {
    if (!this.started) {
      this.started = true;
      App.require('../config/database')(process.env.DATABASE_URL || 'mongodb://localhost/lnksvr', function() {
        App.app.listen(App.port);
        console.log("Running App Version " + App.version + " on port " + App.port + " in " + App.env + " mode");
      });
    }
  }
};

// Set up Jade.
App.app.set('views', App.appPath("templates"));
App.app.set('view engine', 'jade');
App.app.set('view options', {
  pretty: env === 'development'
});

// Middleware
var favicon = require('serve-favicon');
App.app.use(favicon(__dirname + '/../public/favicon.ico'));

var bodyParser = require('body-parser');
App.app.use(bodyParser.urlencoded());
App.app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
App.app.use(cookieParser());

App.app.use(App.require('middleware/authenticate'));

App.app.use(express.static(App.appPath('../public/build')));

App.app.use(require('./router'));

// Handle 404
App.app.use(function(request, response) {
  response.render('404', {
    page_title: 'LnkSvr - 404',
    user: request.user
  });
});
