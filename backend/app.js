var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors');
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


//cron setup
const cron = require("node-cron");
const fs = require("fs");

let shell = require("shelljs");

// schedule tasks to be run on the server   
/* cron.schedule("* * * * *", function () {
  console.log("---------------------");
  console.log("running Cron Job");
  if (shell.exec("mongod database.job  .dump > data_dump.job").code !== 0) {
    shell.exit(1);
  }
  else {
    shell.echo("Database backup complete");
  }
}); */

//cron another way
//*/1 * * * * su -s /bin/sh nobody -c 'cd ~dstrt/www && /usr/local/bin/git -q pull origin master'

var gitPullCron = require('git-pull-cron');

/*
- Clone given repo final/git-jobs into , replacing what's already there
- Schedule cron to run every day 11.00
- When cron task runs, a `git pull origin master` will be performed
- Once cron task has run the callback will get invoked with latest commit info
 */
gitPullCron.init("https://github.com/ChaminduJ/GitHub-Jobs.git", "./../../final/git-jobs", "00 11 * * *", function(err, commit) {
    if (err) {
      return console.error(err.stack);
    }

    console.log("Updated to commit: " + commit.id);
  }
);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//database connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/job', { promiseLibrary: require('bluebird') })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/img',express.static(path.join(__dirname, 'public/img')));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
