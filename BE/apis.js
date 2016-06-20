var express = require('express');
var router = express.Router();

// var taskModel = require('./taskModel.js')

router.get('/', function(req, res){
        res.send("Root!");
    });
router.get('/test1', function(req, res){
        res.send({test1: "OK!"});
    });


module.exports = router;