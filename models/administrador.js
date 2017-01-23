var Schema = require('mongoose').Schema

var administrador = new Schema({
  admin_id       	: ObjectId,
  admin_nombre   	: String,
  admin_apellido 	: Number,
  admin_email		: String,
  admin_rol			: String,
  admin_estado		: String
})

