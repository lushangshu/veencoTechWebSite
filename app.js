var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var schedule = require('node-schedule');
var xmlParser = require('xml2js');
var util = require('util');
var request = require('request');
var index = require('./routes/index');
var users = require('./routes/users');
var work = require('./routes/work');
var about = require('./routes/about');
var contact = require('./routes/contact');
var login = require('./routes/login');
var wxTestPage = require('./routes/wxTest');

var app = express();

app.locals.points = "8,713";
app.locals.dataFile = require('./dataFile.json');
app.locals.userName = "login";
app.locals.access_token = "";
app.locals.ticket="";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'staticHtmls')));

app.use(session({
  secret: 'secret', //为了安全性的考虑设置secret属性
  cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
  resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
  saveUninitialized: false, //
  isLogin:false,
  userName:''
}));

app.use(cookieParser());
app.use('/', index);
app.use('/users', users);
app.use('/work',work);
app.use('/about',about);
app.use('/contact',contact);
app.use('/login',login);


function scheduleCronstyle(){
    schedule.scheduleJob('1 * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());

    });
}

//basic handling functions
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if(err){
    res.locals.message = err;
  }
  next();
});

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
