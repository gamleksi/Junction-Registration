var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var passport = require('passport');
var exphbs = require('express-handlebars');
var LocalStrategy = require('passport-local').Strategy;
//var config = require('./config/app-config')
var helmet = require('helmet');

var orm = require('orm');

var Users = require('./models/user');


//init app
var app = express();

//use helmet
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


//Database connection middleware
app.use(orm.express(process.env.DATABASE_URL, {
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
            console.log("Database synced");
          }
        });
        next();
    }
}));


var routes = require('./routes/index');
var confirm = require('./routes/confirm');
var users = require('./routes/users');
var admin = require('./routes/admin');
var refuse = require('./routes/refuse');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/img/favicon.ico'));


app.use(session({
  secret: process.env.SESSION_SECRET, //Helps to improve encyption. TODO: text should keep private and unique for this app!! 
  resave: true, // 'True' updates session every new view. Helps avoiding session expiring.
  saveUninitialized: true //Earlier true. Change to reduce database traffic when anonymous users.
}));

//Passport configuration to middleware.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


//Bodyparser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


//connect flash middleware

app.use(flash());


app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//app.use('/', routes);
app.use('/', users);
app.use('/refuse', refuse);
app.use('/confirm', confirm);
app.use('/admin', admin);

app.set('port', (process.env.PORT));


app.listen(app.get('port'), function(){
  console.log('listening to port ' + app.get('port'));
});



