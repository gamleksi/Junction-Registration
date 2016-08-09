var dotenv = require('dotenv').config();
var orm = require('orm');
var EventEmitter = require('events');
var event = new EventEmitter();
var Users = require('../models/user');

event.once('event', function(hackers){
	orm.express(process.evn.DATABASE_URL, {
	    error: function(err){
	      console.error(err);
	    }, 
	    define: function (db, models, next) {
	        models.users = Users.createModel(db);
	        db.sync(function(err,success){
	          if(err){
	            console.log(err);
	          }
	          else{
	            console.log("synced");
	            for(i in hackers) {
	              models.users.createUser(hackers[i], function(err, user) {
	                  if(err) {
	                    console.error(err); 
	                  }
	              });              
	            }
	          }

	        });
	    }
	});
});


orm.express(process.evn.DATABASE_URL_OLD, {
    error: function(err){
      console.error(err);
    }, 
    define: function (db, models) {
        models.users = Users.createModel(db);
        db.sync(function(err,success){
          if(err){
            console.log(err);
          }
          else{
            console.log("synced");
            for(i in hackers) {
              models.users.getUsers(function(users) {
                  if(users) {
                    event.emit('event', users)     
                  }
              });              
            }
            console.log('ready')

          }

        });
    }
});


