var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

if (process.env.NODE_ENV !== 'production') {
  require('./lib/secrets');
}

require(path.join(process.cwd(), './lib/mongodb'));

var routesMain = require('./routes/routes.main');
var routesArtist = require('./routes/routes.artist');
var routesAlbum = require('./routes/routes.album');
var routesUser = require('./routes/routes.user');

var artist = require('./lib/artist');
var lessCSS = require('less-middleware');

app.set('view engine', 'ejs');
app.locals.title = 'NODETUNEZ';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  // req.session.regenerate(function () {
    console.log('SESSION---->', req.session);
    console.log(req.sessionID);
    next();
  // });
});

app.use(lessCSS('www'));

app.use(bodyParser.urlencoded({
  extended : true,
  type     : '*/x-www-form-urlencoded'
}));

app.use(function getAuthStatus (req, res, next) {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/', routesMain);
app.use('/user', routesUser);
app.use(express.static('www'));

app.use(function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/user/login')
  }
});

app.use('/artist', routesArtist);
app.use('/album', routesAlbum);

app.use(function (req, res) {
  // 400s before 500s
  res.status(403);
  res.send('Unauthorized');
});

app.use(function (err, req, res, next) {
  // 500s after 400s
  console.log('err.stack', err.stack);
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
// create artist -
// list artists -
// delete artist -
// search artists -
// add album to artist -





