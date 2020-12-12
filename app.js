var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var MySQLStore = require('express-mysql-session')(session);
var cors = require('cors');

var indexRouter = require('./routes');
var authRouter = require('./routes/auth');
var projectRouter = require('./routes/project');

require('dotenv').config();

var options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
};

var sessionStore = new MySQLStore(options);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  HttpOnly:true,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: true 
}));

app.use(cors());

app.use('/',indexRouter);
app.use('/auth', authRouter);
app.use('/project', projectRouter);

module.exports = app;