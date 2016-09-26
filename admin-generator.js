var dotenv = require('dotenv').config();

var config = require('./config/app-config')

var orm = require('orm');

var Users = require('./models/user');



orm.express(config.databaseUrl, {
    error: function(err){
      console.error(err);
    }, 
    define: function (db, models, next) {
        models.users = Users.createModel(db);
        db.sync(function(err,success){
          if(err){

            // TODO: Mitä tehdä jos sync error

            console.log(err);
          }
          else{
            console.log("synced");
            models.users.createUser(process.env.admin, function(err, user) {
          if(err) {
            console.error(err);     
          }
          console.log(user);
        });
          }

        });
    }
});