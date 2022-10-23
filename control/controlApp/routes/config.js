var express = require('express');
var router = express.Router();
var db  = require('../bin/sqlite/database')

/* GET config listing. */
router.get('/', function(req, res, next) {
    var sql = "select * from config"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.render('config' , { results: rows })
      });
});

router.get('/scsHost', function(req, res, next) {
    var sql = "select * from config where key = 'SCS_MOPIDY'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows[0]
        })
      });
});

router.get('/torhymne', function(req, res, next) {
    var sql = "select * from config where key = 'TORHYMNE'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log(rows[0])
        result = rows[0].value;
        if (result) {
            res.send(result)
        } else {
            res.send("Not_Found!")  
        }
      });
});

router.get('/einlaufmusik', function(req, res, next) {
    var sql = "select * from config where key = 'EINLAUFMUSIK'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        result = rows[0].value;
        if (result) {
            res.send(result)
        } else {
            res.send("Not_Found!")  
        }
      });
});


router.post('/update', function(req, res, next) {


    var update = 'UPDATE config SET value = ? WHERE key = ?'
    updateObject = req.body
    if (updateObject){
        for (var key in updateObject) {
            db.run(update, [updateObject[key],key]); 
        }
    }
    res.send("Updated")


});

router.get('/musicHost', function(req, res, next) {
    var sql = "select * from config where key = 'MUSIC_MOPIDY'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows[0]
        })
      });
});

module.exports = router;