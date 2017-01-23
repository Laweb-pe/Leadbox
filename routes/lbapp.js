var express = require('express');
var router = express.Router();





/* controlador principal de la aplicacion  */






router.get('/',ensureAuth,function(req, res, next) {

  res.send('bienvenido a la aplicacion');
  

});






function ensureAuth(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/lbapp/login');
}

module.exports = router;
