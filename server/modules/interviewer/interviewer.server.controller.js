/**
 * Created by Nitsan on 09/07/2016.
 */
"use strict";

let router = require('express').Router();

let interviewerService = require('./interviewer.server.service'),
    authMiddleware = require('../../middlewares/auth.server.mid.js');

router
    .get('/api/interviewer/:interviewerId', authMiddleware.isLoggedIn, function (req, res) {
        let userId = req.user.userId;
        let interviewerId = req.params.interviewerId;
        interviewerService.getInterviewerById(userId, interviewerId)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
    .delete('/api/interviewer/:interviewerId', authMiddleware.isLoggedIn, function (req, res) {
        let userId = req.user.userId;
        let interviewerId = req.params.interviewerId;
        interviewerService.deleteInterviewer(userId, interviewerId)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });

router
    .get('/api/interviewer', authMiddleware.isLoggedIn, function (req, res) {
        let userId = req.user.userId;
        interviewerService.getInterviewers(userId)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
    .post('/api/interviewer', authMiddleware.isLoggedIn, function (req, res) {
        let userId = req.user.userId;
        let interviewer = req.body.interviewer;
        interviewerService.saveInterviewer(userId, interviewer)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });

module.exports = router;