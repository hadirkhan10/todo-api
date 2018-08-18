var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({
    response: 'Welcome to the todo app'
  }))
});

module.exports = router;
