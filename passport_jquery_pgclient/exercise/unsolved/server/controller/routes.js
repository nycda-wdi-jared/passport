var pg = require('pg');

var dbUrl = {
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: 'pg_pass',
	host: 'localhost',
	port: 5432
};

var pgClient = new pg.Client(dbUrl);

pgClient.connect();

var express = require('express');
var path = require('path');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var router = express.Router();

var html_creator = require('../helpers/html_creator.js');

passport.serializeUser(function(user,done){
	done(null, user);
});

passport.deserializeUser(function(obj,done){
	done(null, obj);
});

passport.use('local-signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, username, password, done){
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

router.get('/api/sign-up', function(req,res){
	if(req.user){
		res.json({message: 'signed-in', user_id: req.user.id});
	}
});

router.get('/api/sign-in', function(req,res){
	if(req.user){
		res.json({message: 'signed-in', user_id: req.user.id});
	}
});

router.post('/api/sign-up', function(req,res,next){
	passport.authenticate('local-signup', function(err, user, info){
		if (err) {
			return next(err);
		} else {
			res.json({user: user, info: info})
		}
	})(req, res, next);
});

router.post('/api/sign-in', function(req,res,next){
	passport.authenticate('local-signin', function(err, user, info){
	    if (err) {
	      	return next(err);
	    }
	    if (!user) {
	    	return res.json({ success : false, message : 'authentication failed', info: info });
	    }
	    req.login(user, function(err){
		if(err){
			return next(err);
		}
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
	if(req.user){
		res.json({message: 'signed-in', user_id: req.user.id});
	}
})

router.get('/profile/:id', (req,res) => {
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
				/* query the users profile here */
			});
		} else {
			res.redirect('/');
		}
	} else {
		res.redirect('/')
	}
});

router.delete('/api/logout-user', function (req, res) {
	req.session.destroy(function(out){
		res.json(out)
	});
});

//merely for creation purposes, not part of this app
router.post('/api/create-pokemon', function(req, res){
	var query = 'INSERT INTO pokemon (name) VALUES ($1)';
	var values = [req.body.name];
	pgClient.query(query, values).then((pokemon) => {
		res.json(pokemon)
	});
});


//merely for creation purposes, not part of this app
router.post('/api/create-profile', function(req, res){
	var query = 'INSERT INTO profile (fav_movie, fav_song, fav_pizza, user_id) VALUES ($1,$2,$3,$4)';
	var values = [req.body.fav_movie, req.body.fav_song, req.body.fav_pizza, req.body.user_id];
	pgClient.query(query, values).then((profile) => {
		res.json(profile)
	});
});

module.exports = router;