var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('templates/landing');
});

router.get('/library', function (req, res) {
  var collection = global.db.collection('artists');
  var collection2 = global.db.collection('albums');
  collection.find().toArray(function(err, artists) {
    console.log("err: ", err);
    collection2.find().toArray(function(err, albums) {
      console.log("err: ", err);
      res.render('templates/library', {artists: artists, albums: albums});
    });
  });
});

module.exports = router;
