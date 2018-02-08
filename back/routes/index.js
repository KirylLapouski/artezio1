var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('../public/index.html', function(err, data){
    if(err) throw err;
    res.send(data);
  });
});

module.exports = router;
