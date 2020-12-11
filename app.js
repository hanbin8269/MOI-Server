var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
const FileStore = require('session-file-store')(session); 

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var projectRouter = require('./routes/project.ts');

require('dotenv').config();

var options = {
  host     : process.env.DB_HOST,
  port     : 3306,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DATABASE
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new FileStore(),
  resave: false,
  saveUninitialized: true,
}));

app.use('/',indexRouter);
app.use('/auth', authRouter);
app.use('/project', projectRouter);

module.exports = app;