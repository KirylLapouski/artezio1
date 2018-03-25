require('babel-register')({
  presets:['react']
});
var express = require('express');
var fs = require('fs');
var React = require('react');
const cheerio = require('cheerio');
var ReactDOMServer = require('react-dom/server');
var LoginIn = require('../views/components/LoginIn.jsx');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  fs.readFile('../public/index.html', function(err, data){
    if(err) throw err;   
    resp.send(data);
  });
});

module.exports = router;