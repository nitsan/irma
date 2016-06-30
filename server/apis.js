var express = require('express');
var router = express.Router();
var pjson = require('../package.json');

router.get('/version', function (req, res) {
    res.send({
        version: pjson.version,
        description: pjson.description,
        author: pjson.author
    });
});

router.get('/test1', function (req, res) {
    res.send({test1: "OK!"});
});


module.exports = router;