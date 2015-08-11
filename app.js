var express = require('express');
var app = express();
var path = require('path');
var routesMain = require('./routes/routes.main');
var routesArtist = require('./routes/routes.artist');
if (process.env.NODE_ENV !== 'production') {
  require('./lib/secrets');
}
require(path.join(process.cwd(), '/lib/mongodb'));
var artist = require('./lib/artist');
var lessCSS = require('less-middleware');

app.set('view engine', 'ejs');
app.locals.title = 'NODETUNEZ';

app.use(lessCSS('public'));

app.use('/', routesMain);
app.use('/artist', routesArtist);

app.use(function (req, res) {
  // 400s before 500s
  res.status(403);
  res.send('Unauthorized');
});

app.use(function (err, req, res, next) {
  // 500s after 400s
  console.log('adsfasf', err.stack);
  res.status(500).send('My Bad');
});

var port = process.env.PORT || 3000;

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});

// -----
// STEPS
// -----
// create artist
// list artists
// delete artist
// search artists
// add album to artist




