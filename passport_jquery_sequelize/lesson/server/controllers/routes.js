var path = require('path');

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var models = require('../models');

var html_creator = require('../helpers/html_creator.js');

module.exports = (app, passport) => {

	app.get('/api/sign-up', function(req,res){
		if(req.user){
			res.json({message: 'signed-in', user_id: req.user.id});
		}
	});

	app.get('/api/sign-in', function(req,res){
		if(req.user){
			res.json({message: 'signed-in', user_id: req.user.id});
		}
	});

	app.post('/api/sign-up', function(req,res,next){
		passport.authenticate('local-signup', function(err, user, info){
			if (err) {
				return next(err);
			} else {
				res.json({user: user, info: info})
			}
		})(req, res, next);
	});

	app.post('/api/sign-in', function(req,res,next){
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

	app.get('/', function(req,res){
		res.sendFile(path.join(__dirname, '../../client/public/html/main_page.html'));
	});

	app.get('/sign-up', function(req,res){
		res.sendFile(path.join(__dirname, '../../client/public/html/sign_up.html'));
	});

	app.get('/sign-in', function(req,res){
		res.sendFile(path.join(__dirname, '../../client/public/html/sign_in.html'));
	});

	app.get('/api/signed-in', (req,res) => {
		if(req.user){
			res.json({message: 'signed-in', user_id: req.user.id});
		}
	})

	app.get('/profile/:id', (req,res) => {
		if(req.user){
			if(req.user.id == req.params.id){
				models.User.findOne({where: {id: req.params.id}}).then((user) => {
					res.set('Content-Type', 'text/html');
					res.send(html_creator(user));	
				})
			} else {
				res.redirect('/');
			}
		} else {
			res.redirect('/')
		}
	});

	app.delete('/api/logout-user', function (req, res) {
	  req.session.destroy(function(out){
	    res.json(out)
	  });
	});

}