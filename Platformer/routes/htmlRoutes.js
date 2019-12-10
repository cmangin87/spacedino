// code written by Jake Wilder

//initialize express routing
var path = require('path');
var router = require('express').Router();

// defines root path to index.html
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// defines contact path to contact.html
router.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/contact.html'))
});

// defines every other path to index.html
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;