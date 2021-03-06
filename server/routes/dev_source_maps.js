var express = require('express');
var serveStatic = require('serve-static');

module.exports = function(ROOT) {
  var router = express.Router();

  // dev source maps
  router.use('/src', function(req, res, next) {
    serveStatic(ROOT + '/src')(req, res, next);
  });
  router.use('/node_modules', function(req, res, next) {
    serveStatic(ROOT + '/node_modules')(req, res, next);
  });

  return router;
};
