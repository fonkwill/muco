var express = require('express');
const AdminService = require('../service/adminService');
var router = express.Router(); 



/* GET all zones */
router.get('/zones', function(req, res, next) {

    ase = new AdminService()
    zones = ase.getZones()
    if (zones) {
        res.status(200).json(zones);
    }
    else res.status(500);
  });

/* GET all groups */
router.get('/groups', function(req, res, next) {

    ase = new AdminService()
    groups = ase.getGroups()
    if (groups) {
        res.status(200).json(groups);
    }
    else res.status(500);
  });


module.exports = router;