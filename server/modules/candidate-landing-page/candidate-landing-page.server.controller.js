/**
 * Created by Nitsan on 22/12/2016.
 */
"use strict";

let router = require('express').Router();

let candidateLandingPageService = require('./candidate-landing-page.server.service');

router.get('/api/candidate-landing-data/:userId/:candidateId', function (req, res) {
    let userId = req.params.userId;
    let candidateId = req.params.candidateId;
    candidateLandingPageService.getCandidateLandingData(userId, candidateId)
        .then(data => {
            res.send(data);
        });
});

module.exports = router;