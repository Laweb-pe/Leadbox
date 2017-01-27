var mongoose = require('mongoose'); 
var Schema = require('mongoose').Schema

var administradorSchema = new mongoose.Schema({
  
  admin_nombre   	: String,
  admin_apellido 	: String,
  admin_email		: String,
  admin_pass		: String,
  admin_rol			: String,
  admin_estado		: String
});

mongoose.model('Administrador', administradorSchema);

 
