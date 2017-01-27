var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../../models/dbconx'); // jala modelos y conexion a mongoose
var administrador = require('../../models/m_administrador');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/',function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Administrador').find({}, function (err,administradores) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.send(administradores);
              }     
        })

});

router.get('/:id',function(req, res, next) {
        mongoose.model('Administrador').findById(req.id, function (err, admin) {
      if (err) {
        console.log('GET Error: Problema al tratar de obtener el admin.id: ' + err);
      } else {
        console.log('GET devolviendo el Administrador: ' + blob._id);
        var admiobj = admin.dob.toISOString();
        admiobj = admiobj.substring(0, admiobj.indexOf('T'))
        res.format({
          html: function(){
              res.render('blobs/show', {
                "blobdob" : blobdob,
                "blob" : blob
              });
          },
          json: function(){
              res.json(blob);
          }
        });
      }
});


.get(function(req, res) {
    mongoose.model('Blob').findById(req.id, function (err, blob) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + blob._id);
        var blobdob = blob.dob.toISOString();
        blobdob = blobdob.substring(0, blobdob.indexOf('T'))
        res.format({
          html: function(){
              res.render('blobs/show', {
                "blobdob" : blobdob,
                "blob" : blob
              });
          },
          json: function(){
              res.json(blob);
          }
        });
      }
    });



router.post('/',function(req, res, next) {
 
        var adminp_nombre = req.body.ad_name;
  		var adminp_apellido = req.body.ad_apell;
  		var adminp_email = req.body.ad_email;
  		var adminp_pass = req.body.ad_pass;
  		var adminp_rol = req.body.ad_rol;
 		var adminp_estado = req.body.ad_estado;
 		

        //call the create function for our database
        mongoose.model('Administrador').create({
        	
  			admin_nombre   	: adminp_nombre,
  			admin_apellido 	: adminp_apellido,
  			admin_email		: adminp_email,
  			admin_pass		: adminp_pass,
  			admin_rol		: adminp_rol,
  			admin_estado	: adminp_estado
        }, function (err, administrador_1) {
              if (err) {
                  res.send("Ocurrió un problema intentando registrar Administradores en la BD");
              } else {
                  //Se creó un nuevo administrador
                  console.log('POST recibido para crear un nuevo administrador: ' + administrador_1);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("/lbapp/admins");
                        // And forward to success page
                        res.redirect("/lbapp/admins");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(administrador_1);
                    }
                });
              }
        })

});


module.exports = router;