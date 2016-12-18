/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let router = require('express').Router();

let pjson = require('../../../package.json');

router.get('/version', function (req, res) {
    res.send({
        version: pjson.version,
        description: pjson.description,
        author: pjson.author
    });
});

module.exports = router;
