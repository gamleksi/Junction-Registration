var dotenv = require('dotenv').config();
var orm = require('orm');
var EventEmitter = require('events');
var event = new EventEmitter();
var Users = require('./models/user');


var Conv=require("csvtojson").Converter;

var async=require("async");

var rs=require("fs").createReadStream("participants.csv"); // or any readable stream to csv data.

var u = undefined;

var q=async.queue(function(json,callback){

  u.addParticipatedAttr(json.email, function(err) {
    
    if(err) {
      console.log("not found");
    }
    callback();
  });
  
},50);//10 concurrent worker same time



q.saturated=function(){
  rs.pause(); //if queue is full, it is suggested to pause the readstream so csvtojson will suspend populating json data. It is ok to not to do so if CSV data is not very large.
};


q.empty=function(){
  rs.resume();//Resume the paused readable stream. you may need check if the readable stream isPaused() (this is since node 0.12) or finished.
};


var conv=new Conv({construct:false});


conv.transform=function(json){
  q.push(json);
};


conv.on("end_parsed",function(){
  q.drain=function(){
  };
});


orm.express(process.env.DATABASE_URL, {
    error: function(err){
      console.error(err);
    }, 
    define: function (db, models) {
        u = Users.createModel(db);
        db.sync(function(err,success){
          if(err){
            console.log(err);
          }
          else{
           rs.pipe(conv); 
          }   
        });
      }
});