var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var getArtistResults = require('../lib/album');

router.get('/', function (req, res) {
  var collection = global.db.collection('artists');
  var artistResults = [];
  res.render('templates/album', {artistResults: artistResults});
});

router.post('/add', function (req, res) {
  var collection = global.db.collection('artists');
  collection.find()
  var collection2 = global.db.collection('albums');
  collection2.save(req.body, function () {
    res.redirect('/');
  });
});

router.post('/:id/delete', function (req, res) {
  var collection = global.db.collection('albums');
  collection.remove({_id: ObjectID(req.params.id)});
  res.redirect('/');
});

module.exports = router;
