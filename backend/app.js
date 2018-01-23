var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config/config');
var members = require('./controllers/MembersController');
var projects = require('./controllers/ProjectsController');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var url = config.mongoUrl;
var connect = mongoose.connect(url);
connect.then((db) =>{
  console.log('Connected correctly to server');

}, (err) =>{
  console.log(err);
});

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api
app.use('/api/members', members);
app.use('/api/projects', projects);
module.exports = app;
