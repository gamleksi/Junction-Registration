var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')
var expressValidator = require('express-validator')
var flash = require('connect-flash');
var session = require('express-session')
var passport = require('passport')
var exphbs = require('express-handlebars')
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/loginapp')
var db = mongoose.connections;


var routes = require('./routes/index');
var users = require('./routes/users');


//init app
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//Passport unut
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))


//Bodyparser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())


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
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})





app.use('/', routes);
app.use('/users', users);


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('listening to port ' + app.get('port'))

});



