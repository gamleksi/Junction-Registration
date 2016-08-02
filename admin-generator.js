var dotenv = require('dotenv').config();
var orm = require('orm');
var Users = require('./models/user');





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
            firstname: "Luukas",
            lastname: "Castren",
            email: "hackjunction@aaltoes.com",
            password: "admin",
            admin: true
          };
            
          models.users.createUser(admin, function(err, user) {
  		      console.log("what")
            if(err) {
  		      	console.error(err);   	
  		      }
		  		console.log(user);
		  	});
          }

        });
    }
});