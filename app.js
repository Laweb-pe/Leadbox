var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport =require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var index = require('./routes/index');
var lbapp = require('./routes/lbapp');
var lb_login = require('./routes/login/');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Sesion para pastport
app.use(expressSession({
	secret: 'unallave secreta',
	resave: false,
	saveUninitialized:false
}));
app.use(passport.initialize()); /* inicializa passport ( se maneja por routes/login/index.js ) */
app.use(passport.session());


//Conectando a mongoses
mongoose.connect('mongodb://localhost:27017/leadbox');
db.on('error', console.error.bind(console, 'Error de conexión Mongo:'));
		db.once('open', function() {
		  console.log('Se enchufo Mongo');
		});

app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.use('/', index);
app.use('/lbapp/login',lb_login);
app.use('/lbapp', lbapp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
