var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scsRouter = require('./routes/scs');
var musicRouter = require('./routes/music');
var configRouter = require('./routes/config');
var speakerRouter = require('./routes/speaker');
var mucoApi = require('./routes/mucoApi.js');


var snapRouter = require('./routes/snap');

var snapserverService = require('./service/snapserverService')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/scs', scsRouter);
app.use('/music', musicRouter);
app.use('/config', configRouter);
app.use('/speaker', speakerRouter);
app.use('/snap', snapRouter);
app.use('/muco/api/', mucoApi )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//app.use(express.json())
//app.use(bodyParser.raw({ type: '*/*' }))

module.exports = app;
