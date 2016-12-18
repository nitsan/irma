/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let router = require('express').Router();

let smsService = require('./sms.server.service.js');

router.post('/send-sms', function (req, res) {
    let phoneNumber = req.body.to;
    let text = req.body.sendText;
    smsService.sendSms(phoneNumber, text)
        .then(() => {
            res.send();
        });
});

module.exports = router;