var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function (req, res) {
  res.render('templates/artist');
});

router.post('/add', function (req, res) {
  var collection = global.db.collection('artists');
  collection.save(req.body, function () {
    res.redirect('/');
  });
});

router.post('/:id/delete', function (req, res) {
  var collection = global.db.collection('artists');
  collection.remove({_id: ObjectID(req.params.id)});
  res.redirect('/');
});

module.exports = router;
