var dotenv = require('dotenv').config();
var orm = require('orm');
var Users = require('./models/user-admin.js');



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
          var admin = {
            email: process.env.EMAIL_FROM,
            password: process.env.ADMIN_PASSWORD,
            admin: true
          };
            
          models.users.createAdmin(admin, function(err, user) {
  		      console.log("what")
            if(err) {
  		      	console.error(err);   	
  		      }
		  		console.log(user);
		  	});
          }

        }); }
});