var express = require('express');
var router = express.Router();

var app = require('../app');
var User = require('../models/User');

router.get('/logout', function logoutUser(req, res) {
  req.session.regenerate(function () {
    res.render('user/login');
  });
});

router.get('/login', function loginUser(req, res) {
  req.session.regenerate(function () {
    res.render('user/login');
  });
});

router.post('/login', function doLogin(req, res) {
  console.log(req.body);
  User.login(req.body, function (err, user) {
    console.log("req.session", req.session);
    req.session.regenerate(function () {
      req.session.user = user;
      res.redirect('/');
    });
  });
});

router.get('/new', function newUser(req, res) {
  //register page
  req.session.regenerate(function () {
    res.render('user/new');
  });
});

router.post('/', function createUser(req, res) {
  //perform the registration
  console.log(req.body);
  User.create(req.body, function (err) {
    if (err) {
      res.render('user/new', {err: err});
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
