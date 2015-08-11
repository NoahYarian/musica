var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('templates/artist');
});

module.exports = router;
