var express = require('express');
var fs = require('fs');
var user = require('../../dao/userModel.js');
var imgPath = 'public/images/norm-ymilitelnuj-pes-4.jpg';




    // store an img in binary in mongo
    var a = new user;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/jpg';
    a.email = 'check';
    a.save(function (err, a) {
      if (err) throw err;

      console.error('saved img to mongo');
    });
    

      // start a demo server
      /*var server = express.createServer();
      server.get('/', function (req, res, next) {
        A.findById(a, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });

      server.on('close', function () {
        console.error('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.error('closing db connection');
          mongoose.connection.close();
        });
      });

    });
  });*/
