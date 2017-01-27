var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Leadbox' });
});

router.post('/', function(req, res, next) {
console.log('TUS datos son:'+req.body);
});




module.exports = router;
