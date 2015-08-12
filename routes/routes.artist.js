var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('templates/artist');
});

router.post('/add', function (req, res) {
  // console.log("global.db: ", global.db);
  var collection = global.db.collection('artists');
  console.log('req.body: ', req.body);
  collection.save(req.body, function () {
    // res.redirect('/');
    console.log('saving req.body');
  });
});

module.exports = router;
