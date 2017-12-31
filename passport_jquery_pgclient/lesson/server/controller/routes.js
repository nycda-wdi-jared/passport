var pg = require('pg');

var dbUrl = require('./conn_string.js')();

var pgClient = new pg.Client(dbUrl);

pgClient.connect();

var express = require('express');
var path = require('path');

//modules used for passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var router = express.Router();

var html_creator = require('../helpers/html_creator.js');

/* passport functions used to authenticate user */

//this is all of the behind the scenes middleware the passport module uses to authenticate a user

passport.serializeUser(function(user,done){
	//console.log(user)
	done(null, user);
});

passport.deserializeUser(function(obj,done){
	//console.log(obj)
	done(null, obj);
});

//look for the local-signin used in one of the routes below
//basically, this below function is called where this 'strategy' is used in the route below
passport.use('local-signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, username, password, done){
	//checking to see if the user exists, and then doing a password check
	//if all clear, then return done(null, user.rows[0]) is used in req.login
	process.nextTick(function(){
		pgClient.query("SELECT * FROM users WHERE username='" + username + "'", (err, user) => {
			if(user.rows.length < 1)
				return done(null, false, {message: 'no user'});
	        if (!bcrypt.compareSync(password, user.rows[0].password)){
	          return done(null, false, {message: 'incorrect password'});
	        }
			return done(null, user.rows[0]);
		});
	});
}));

//look for the local-signup used in one of the routes below
//basically, this below function is called where this 'strategy' is used in the route below
passport.use('local-signup', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, username, password, done){
	process.nextTick(function(){
		pgClient.query("SELECT username FROM users WHERE username='" + username + "'", (err, user) => {
			if(user.rows.length > 0){
				return done(null, false, {message: 'username taken'});
			} else {
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(password, salt);
				var query = "INSERT INTO users (name, username, password) VALUES ($1,$2,$3)";
				pgClient.query(query, [req.body.name, username, hashedPassword], (error,queryRes) => {
					if(error){
						console.error(error)
					} else {
						return done(null, queryRes)
					}
				});
			};
  		});
    });
}));
/* ------------------------------------------------ */

/*
	Look for this route on the client side
	I am merely just checking to see if the user is logged in
	and then making a decision from there

	if(req.user) means "if req.user is not undefined"
*/
router.get('/api/sign-up', function(req,res){
	if(req.user){
		res.json({message: 'signed-in', user_id: req.user.id});
	}
});

/*
	Look for this route on the client side
	I am merely just checking to see if the user is logged in
	and then making a decision from there

	if(req.user) means "if req.user is not undefined"
*/
router.get('/api/sign-in', function(req,res){
	if(req.user){
		res.json({message: 'signed-in', user_id: req.user.id});
	}
});

//from the local-signup strategy above
//as you can tell, instead of writing the sequel query in here, we write all of that
//in the strategy above, and call that strategy here
router.post('/api/sign-up', function(req,res,next){
	passport.authenticate('local-signup', function(err, user, info){
		if (err) {
			return next(err);
		} else {
			res.json({user: user, info: info})
		}
	})(req, res, next);
});

//from the local-signup strategy above
//as you can tell, instead of writing the sequel query in here, we write all of that
//in the strategy above, and call that strategy here
router.post('/api/sign-in', function(req,res,next){
	passport.authenticate('local-signin', function(err, user, info){
	    if (err) {
	      	return next(err);
	    }
	    //if the user does not exist or the password entered does not match the password in the database
	    //then there is no user, and this message is sent to the client
	    if (!user) {
	    	return res.json({ success : false, message : 'authentication failed', info: info });
	    }
	    //if there is a user, then this req.login function, along with the serializing and deserializing above
	    //will create a req.user object to be used in your routes, and also create a record
	    //in the database under the sessions table
	    req.login(user, function(err){
			if(err){
				return next(err);
			}
			//also sending this response to the client
	      	return res.status(200).json({ success : true, message : 'authentication succeeded', object : user });        
		});
  	})(req, res, next);
});

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/html/main_page.html'));
});

router.get('/sign-up', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/html/sign_up.html'));
});

router.get('/sign-in', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/html/sign_in.html'));
});

router.get('/api/signed-in', (req,res) => {
	//this req.user object is created through req.login
	//this here is checking to see if there is a req.user in the req object
	//console.log(req.user)
	if(req.user){
		res.json({message: 'signed-in', user_id: req.user.id});
	}
})

router.get('/profile/:id', (req,res) => {
	//this req.user object is created through req.login
	//this here is checking to see if there is a req.user in the req object
	//console.log(req.user)
	if(req.user){
		if(req.user.id == req.params.id){
			var userInfo = [];
			var query = `SELECT name FROM users WHERE id=${req.params.id}`;
			var profileArr = [];
			pgClient.query(query, (error,queryRes) => {
				var userArr = [];
				if(error){
					res.json({error: error})
				} else {
					userArr.push(queryRes.rows[0])
				}
				var pokemonQuery = `SELECT * FROM pokemon`
				pgClient.query(pokemonQuery, (pokemonError, pokemonRes) => {
					var pokemonArr = [];
					if(pokemonError){
						res.json({error: pokemonError})
					} else {
						pokemonArr.push(pokemonRes.rows)
						var data = {
							user: userArr[0],
							pokemon: pokemonArr[0]
						}
						res.set('Content-Type', 'text/html');
						res.send(html_creator(data));
					}
				})
			});
		} else {
			res.redirect('/');
		}
	} else {
		res.redirect('/')
	}
});

//logs out the user, and deletes the session from the req object and the database
router.delete('/api/logout-user', function (req, res) {
  req.session.destroy(function(out){
    res.json(out)
  });
});

module.exports = router;