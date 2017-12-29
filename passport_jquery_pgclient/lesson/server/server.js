var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
//adding sessions to the sessions table in the database
var PostgreSqlStore = require('connect-pg-simple')(session);
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');

var dbUrl = require('./controller/conn_string.js')();
var routes = require('./controller/routes.js');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//middleware that is used to make passport work, as well as work with the pg client
//Your sessions table stores sessions of people who are logged in
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
	secret: "secret",
	resave : true,
	saveUninitialized : false,
	store : new PostgreSqlStore({
		conString: dbUrl
	})
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use(express.static('./client'));

var PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});