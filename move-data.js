var dotenv = require('dotenv').config();
var orm = require('orm');
var EventEmitter = require('events');
var event = new EventEmitter();
var Users = require('./models/user');
var OldUsers = require('./models/user_old');

console.log("process.env.DATABASE_URL_");
console.log(process.env.DATABASE_URL_OLD);
console.log(process.env.DATABASE_URL);

event.once('event', function(hackers){
	orm.express(process.env.DATABASE_URL, {
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
	            var arr = [];
	            var l = hackers.length;
	            event.on('created', function(index){
					models.users.createUser(hackers[index], function(err, user) {
					  if(err) {
					    console.error(err); 
					  }
					  arr.push(user);
					  if(arr.length === l) {
					  	console.log("data moved!!");
					  	console.log(user);
					  } else {
					  	var n = index + 1;
					  	console.log("n " + n);
						event.emit('created', n);
					  }
					});
	            });
	              event.emit('created', 0);
	            }
	          
	        });
	    }
	});
});


orm.express(process.env.DATABASE_URL_OLD, {
    error: function(err){
      console.error(err);
    }, 
    define: function (db, models) {
        models.users = OldUsers.createModel(db);
        db.sync(function(err,success){
          if(err){
            console.log(err);
          }
          else{
            console.log("synced");
              models.users.getUsers(function(users) {
                  if(users) {
                    event.emit('event', users);     
                  }
              });              
            console.log('ready');

          }

        });
    }
});


