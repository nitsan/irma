/**
 * Created by Nitsan on 09/07/2016.
 */
var express = require('express');
var router = express.Router();
var logger = require('winston');

var CandidateModel = require('./candidate.server.model.js');

router.get('/api/uid/:uid/candidate', function (req, res) {
    logger.profile("Get candidate for user: " + req.params.uid);
    CandidateModel.find({userId: req.params.uid}).lean().exec(function (err, candidates) {
        logger.profile("Get candidate for user: " + req.params.uid);
        if (err) {
            res.status(400).send({err: err});
        }

        res.send(candidates);
    });
});

router.post('/api/uid/:uid/candidate', function (req, res) {
    var candidate = req.body.candidate;
    if (!candidate){
        res.status(400).send({err: "Cannot get candidate for create"});
    }

    candidate.userId = req.params.uid;
    candidate.updateDate = new Date().getTime();
    candidate.createDate = new Date().getTime();

    var newCandidate = new CandidateModel(candidate);

    newCandidate.save(function (err, candidate) {
        if (err) {
            logger.error("Cannot create candidate, err" + err);
            res.status(400).send({err: err});
        }

        res.send(candidate);
    });
});

router.put('/api/uid/:uid/candidate', function (req, res) {
    var candidate = req.body.candidate;
    if (!candidate){
        res.status(400).send({err: "Cannot get candidate for update"});
    }

    candidate.userId = req.params.uid;
    candidate.updateDate = new Date().getTime();
    CandidateModel.findOneAndUpdate({userId: candidate.userId, id: candidate.id}, candidate, function(err, updatedCandidate){
        if (err) {
            logger.error("Cannot update candidate, err" + err);
            res.status(400).send({err: err});
        }

        res.send(updatedCandidate);
    });
});

router.delete('/api/uid/:uid/candidate/:id', function (req, res) {
    var userId = req.params.uid;
    var id = req.params.id;
    CandidateModel.findOneAndRemove({userId: userId, id: id}, function (err) {
        if (err) {
            logger.error("Cannot remove candidate, err" + err);
            res.status(400).send({err: err});
        }

        res.send();
    });
});

module.exports = router;
