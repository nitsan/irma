/**
 * Created by Nitsan on 09/07/2016.
 */
"use strict";

let router = require('express').Router();

let candidateService = require('./candidate.server.service.js'),
    authMiddleware = require('../../middlewares/auth.server.mid.js');

router.get('/api/candidate/:candidateId', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    let candidateId = req.params.candidateId;
    candidateService.getCandidateById(userId, candidateId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/api/candidate', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    candidateService.getCandidates(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/api/candidate', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    let candidate = req.body.candidate;
    candidateService.createCandidate(userId, candidate)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put('/api/candidate', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    let candidate = req.body.candidate;
    candidateService.updateCandidate(userId, candidate)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.delete('/api/candidate/:candidateId', authMiddleware.isLoggedIn, function (req, res) {
    let userId = req.user.userId;
    let candidateId = req.params.candidateId;
    candidateService.deleteCandidate(userId, candidateId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;