var express = require('express');
var mopidyController  = require('../bin/mopidyControl/mopidyController')
var router = express.Router();


/* GET music listing. */
router.get('/', function(req, res, next) {
  res.send("Music Root")
});

router.get('/play', function(req, res, next) {
    mopidyController.playMusic();
    res.send("Music started")
});

router.get('/stop', function(req, res, next) {
  mopidyController.pauseMusic();
  res.send("Music paused")
});

router.get('/talkover', function(req, res, next) {
  mopidyController.talkOver();
  res.send("TalkOver activated!")
});

router.get('/resettalkover', function(req, res, next) {
  mopidyController.resetTalkOver();
  res.send("TalkOver deactivated!")
});

module.exports = router;