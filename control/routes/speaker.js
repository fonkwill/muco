var express = require('express');
var router = express.Router();
const SnapStream  = require('../public/javascripts/speaker/snapstream')

/* GET config listing. */
router.get('/', function(req, res, next) {
 
  // var snapstream = new SnapStream("http://192.168.0.96:1780");
  // console.log(snapstream);
  res.render('speaker'); 
});


module.exports = router;