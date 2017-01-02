/**
 * Created by Nitsan on 22/12/2016.
 */
"use strict";

let router = require('express').Router();

let candidateLandingPageService = require('./candidate-landing-page.server.service'),
    authMiddleware = require('../../middlewares/auth.server.mid.js');

router.get('/api/candidate-landing-data/:userId/:candidateId', function (req, res) {
    let userId = req.params.userId;
    let candidateId = req.params.candidateId;
    candidateLandingPageService.getCandidateLandingData(userId, candidateId)
        .then(data => {
            res.send(data);
        });
});

router.get('/api/candidate-template', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    candidateLandingPageService.getCandidateTemplate(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put('/api/candidate-template', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    let candidateTemplate  = req.body;
    candidateLandingPageService.saveCandidateTemplate(userId, candidateTemplate)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;