var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport =require('passport');
var LocalStrategy = require('passport-local').Strategy;








/* configurar passport  */

passport.use(new LocalStrategy((username,password,done) => {
	

	if(username === 'c.hipolito@laweb.pe' && password === '123'){
		
		return done(null,{name:'Cesar',user:'cesar',id:'1'});
	}
	done(null,false,{message:'Sesión no iniciada'});
}));

passport.serializeUser((user,done) => { done(null,user)});
passport.deserializeUser((user,done)=>{
	// logica a BD
	done(null,user);
});





/* controlador para logins  */

router.get('/', function(req, res, next) {

  res.render('login/login');

});

router.post('/', passport.authenticate(
		'local',
		{
			successRedirect: '/lbapp',
			failureRedirect: '/lbapp/login'
		}
	));

router.get('/logout', function(req, res, next) {
	req.logout();
  	res.redirect('/lbapp');
  
});




function ensureAuth(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/lbapp/login');
}

module.exports = router;


