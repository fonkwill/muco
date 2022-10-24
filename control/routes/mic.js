var express = require('express');
var ffmpeg = require('ffmpeg');
var multer = require('multer');
const fs = require('fs')
var upload = multer()
var router = express.Router();  
app = express()
app.use(express.static(__dirname))


/* GET mic page. */
router.get('/', function(req, res, next) {
  res.render('mic', { title: 'SKPlay Control - Mic' });
});


router.post('/post_data/', upload.any(), (req, res) => {
  console.log('POST /post_data/');
  console.log('Files: ', req.files);
  fs.writeFile(req.files[0].originalname, req.files[0].buffer, (err) => {
      if (err) {
          console.log('Error: ', err);
          res.status(500).send('An error occurred: ' + err.message);
      } else {
          try{
            var process = new ffmpeg(req.files[0].originalname);
            process.then(function (audio) {
              audio.fnExtractSoundToMP3(req.files[0].originalname+'.mp3', function(error, file) {
                if(!error)s
                  console.log('Audio file ' + file);
              });
            }, function (err) {
              console.log('Error: ' + err);
            });
          }
          catch (e){
            console.log(e.code);
            console.log(e.msg)
          };

          res.status(200).send('ok');
      }
  });

  //send("ok")
});

router.post('/data/', function(req, res, next) {
  blob = req.body;
  console.log(req.body)
  res.send("Played");
});

module.exports = router;