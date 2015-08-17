var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var getArtistResults = require('../lib/album');

router.get('/', function (req, res) {
  var collection = global.db.collection('artists');
  var artistResults = [];
  var artist = null;
  res.render('templates/album', {artistResults: artistResults, artist: artist});
});

router.post('/add', function (req, res) {
  console.log(req.params);
  var collection = global.db.collection('albums');
  console.log("album add req.body: ", req.body);
  collection.save(req.body, function () {
    res.redirect('/library');
  });
});

router.post('/:id/delete', function (req, res) {
  var collection = global.db.collection('albums');
  collection.remove({_id: ObjectID(req.params.id)});
  res.redirect('/library');
});

module.exports = router;
