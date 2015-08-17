var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function (req, res) {
  res.render('templates/artist');
});

router.get('/get', function (req, res) {
  var collection = global.db.collection('artists');
  var artists = collection.find().toArray(function(err, artists) {
    res.send(artists);
  });
});

router.post('/add', function (req, res) {
  var collection = global.db.collection('artists');
  collection.save(req.body, function () {
    res.redirect('/library');
  });
});

router.post('/:id/delete', function (req, res) {
  var collection = global.db.collection('artists');
  collection.remove({_id: ObjectID(req.params.id)});
  res.redirect('/library');
});

router.post('/:id/addAlbum', function (req, res) {
  var artistResults = [];
  console.log(req.params.id);
  var collection = global.db.collection('artists');
  var artist = collection.find({_id: ObjectID(req.params.id)}).toArray(function(err, artist) {
    console.log('artist: ', artist);
    res.render('templates/album', {artistResults: artistResults, artist: artist[0].name});
  });

});

module.exports = router;
