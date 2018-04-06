var express = require('express');
var router = express.Router();
var authCheck = require('./utils/authCheck');
var path = require('path');
router.route('/:userName')
    .get(authCheck, function (req, resp) {
        resp.render('index');
    });


module.exports = router;