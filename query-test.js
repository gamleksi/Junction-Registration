var dotenv = require('dotenv').config();
var orm = require('orm');
var EventEmitter = require('events');
var event = new EventEmitter();
var Users = require('./models/user');
var OldUsers = require('./models/user_old');

	orm.express(process.env.DATABASE_URL, {
	    error: function(err){
	      console.error(err);
	    }, 
	    define: function (db, models, next) {
	        var users = Users.createModel(db);
	        db.sync(function(err,success){
	          if(err){
	            console.log(err);
	          }
	          else{
	          	users.masterSearch({"filterShow": {"countryHome": "FI"}, "sortBy": ["age", "firstname"]}, function(res) {
	          		for(var key in res) {
	          			console.log(res[key].age + " " + res[key].firstname)
	          		}
	          	})
	          }

	        });
	    }
	});
