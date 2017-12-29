var models = require('../models');

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

/*
	Built in passport functions used to make passport work with authentication
	Look for where it being used in the server.js file
	Look at how the parameter is used as a placeholder here and then actually used in the server.js file
*/
module.exports = function(passport) {

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
			models.User.findOne({where: {username: username}}).then(function(user){
				if(!user)
					return done(null, false, {message: 'no user'});
		        if (!bcrypt.compareSync(password, user.get('password_hash'))){
		          return done(null, false, {message: 'incorrect password'});
		        }
				return done(null, user);
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
			models.User.findOne({where: {username: username}}).then(function(user){
				if(user){
					return done(null, false, req.flash('signupMessage', 'That username already taken'));
				} else {
	  				return models.User.create({
	  					name: req.body.name,
	  					username: username,
	  					password: password
	  				}).then(function(newUser){
	  					return done(null, newUser)
						}).catch(function(err){
							console.error(err);
						});
				};
	  		});
	    });
	}));

}