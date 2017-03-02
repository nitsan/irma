/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let router = require('express').Router();

let smsService = require('./sms.server.service.js'),
    authMiddleware = require('../../middlewares/auth.server.mid.js');

router.post('/api/send-sms/:meetingId', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    let meetingId = req.params.meetingId;
    smsService.sendSmsToCandidate(userId, meetingId)
        .then(() => {
            res.send({success: true});
        });
});

router.post('/send-sms-im-here/:userId/:candidateId', function (req, res) {
    let userId = req.params.userId;
    let candidateId = req.params.candidateId;
    smsService.sendSmsImHere(userId, candidateId)
        .then(() => {
            res.send();
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;