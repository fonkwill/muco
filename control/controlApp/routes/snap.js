var express = require('express');
var snapControler  = require('../bin/snapControl/controlSnap')
var router = express.Router();

router.get('/clients', function(req, res, next) {
    var clients = snapControler.getClients();
    res.send(clients)
});

module.exports = router