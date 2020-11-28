var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var MYSQLStore = require('express-mysql-session')(session);
var fs = require("fs");
const { Store } = require('express-session');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/users');


require('dotenv').config();

var options = {
  host:process.env.DB_HOST,
  port:3306,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DATABASE
}

var sessionStore = new MYSQLStore(options);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(3000, function(){
 console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: process.env.SECRET_KEY,
 resave: false,
 saveUninitialized: true,
 store:sessionStore
}));

app.use('/'.indexRouter);
app.use('/auth', authRouter);