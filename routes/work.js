var express = require('express');
var utility = require('utility');
var vd = require('../dataFile.json');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  var tiTle = 'login';
  if(req.session.user!=null){
    console.log('session is '+ req.session);
    tiTle = req.session.user;
  }
  res.render('work',
  {
    title: tiTle,

  });
});


module.exports = router;
