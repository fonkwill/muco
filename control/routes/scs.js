var express = require('express');
var mopidyController  = require('../bin/mopidyControl/mopidyController')
var router = express.Router();

/* GET scs listing. */
router.get('/', function(req, res, next) {
  res.send("SCS Root")
});

router.get('/play/*', function(req, res, next) {
  if ( req.params.length < 1 )
    res.send("Error - No ID for SCS");
  else
    var scsId = req.params[0];
    if (scsId == null)
      res.send("Error - No Parameter for ID")
    mopidyController.playOnceScs(scsId)
    res.send(scsId)
});

router.get('/stop', function(req, res, next) {
  var url = mopidyController.stopScs()
  res.send("Stopped");
});

module.exports = router;