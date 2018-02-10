var UserDao = require('./userDao');

var userDao = new UserDao();

userDao.update({_id:'Kek'},{ check:'Checked',asdf:'Checked'});