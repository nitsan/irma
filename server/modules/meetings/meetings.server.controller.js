/**
 * Created by nitsa on 30/01/2017.
 */
"use strict";

let router = require('express').Router();

let meetingsService = require('./meetings.server.service'),
    authMiddleware = require('../../middlewares/auth.server.mid.js');

router.get('/api/candidate/:candidateId/meeting', authMiddleware.isLoggedIn, (req, res) => {
    const userId = req.user.userId;
    const candidateId = req.params.candidateId;
    meetingsService.getMeetingsByCandidateId(userId, candidateId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/api/candidate/:candidateId/meeting',
    authMiddleware.isLoggedIn,
    (req, res) => {
        let userId = req.user.userId;
        let candidateId = req.params.candidateId;
        let meeting = req.body;
        meetingsService.saveMeeting(userId, candidateId, meeting)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });

///api/candidate/${candidateId}/meeting/${meetingId}
router.delete('/api/candidate/:candidateId/meeting/:meetingId',
    authMiddleware.isLoggedIn,
    (req, res) => {
        const userId = req.user.userId;
        const candidateId = req.params.candidateId;
        const meetingId = req.params.meetingId;
        meetingsService.deleteMeeting(userId, candidateId, meetingId)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });


module.exports = router;