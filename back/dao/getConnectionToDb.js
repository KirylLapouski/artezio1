const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../etc/config.json');
 module.exports = {
     createStore: function(){
         var connectConfig = {
            url: 'mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name,
            autoRemove: 'interval',
            autoRemoveInterval: 10
          }
        return new MongoStore(connectConfig);
     }
 }