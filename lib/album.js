module.exports = function (query) {
  var collection = global.db.collection('artists');
  return collection.find({ name: { $regex: query}}).toArray(function(err, artists) {console.log(artists);});
}
