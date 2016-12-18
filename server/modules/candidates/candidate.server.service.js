/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let logger = require('winston');

let CandidateModel = require('./candidate.server.model.js'),
    Counters = require('./../auto-increment/counters.server.model.js');

exports.getCandidateById = function getCandidateById(userId, candidateId) {
    return new Promise((resolve, reject) => {
        logger.profile(`Get candidate [${candidateId}] for user: [${userId}]`);
        CandidateModel.findOne({userId: userId, candidateId: candidateId}).lean().exec(function (err, candidate) {
            logger.profile(`Get candidate [${candidateId}] for user: [${userId}]`);
            if (err) {
                reject(err);
            }

            resolve(candidate);
        });
    });
};

exports.getCandidates = function getCandidates(userId) {
    return new Promise((resolve, reject) => {
        logger.profile("Get candidate for user: " + userId);
        CandidateModel.find({userId: userId}).lean().exec(function (err, candidates) {
            logger.profile("Get candidate for user: " + userId);
            if (err) {
                reject(err);
            }

            resolve(candidates);
        });
    });
};

exports.createCandidate = function createCandidate(userId, candidate) {
    return new Promise((resolve, reject) => {
        if (!candidate) {
            reject(new Error("Cannot get candidate for create"));
        }

        candidate.userId = userId;
        candidate.updateDate = new Date().getTime();
        candidate.createDate = new Date().getTime();

        Counters.getNextSequence('candidateId')
            .then(candidateId => {
                candidate.candidateId = candidateId;
                let newCandidate = new CandidateModel(candidate);

                newCandidate.save(function (err, candidate) {
                    if (err) {
                        logger.error("Cannot create candidate, err" + err);
                        reject(err);
                    }

                    resolve(candidate);
                });
            });
    });
};

exports.updateCandidate = function updateCandidate(userId, candidate) {
    return new Promise((resolve, reject) => {
        if (!candidate) {
            reject(new Error("Cannot get candidate for update"));
        }

        candidate.userId = userId;
        candidate.updateDate = new Date().getTime();

        CandidateModel.findOneAndUpdate({
            userId: candidate.userId,
            candidateId: candidate.candidateId
        }, candidate, function (err, updatedCandidate) {
            if (err) {
                logger.error("Cannot update candidate, err" + err);
                reject(err);
            }

            resolve(updatedCandidate);
        });
    });
};

exports.deleteCandidate = function deleteCandidate(userId, candidateId) {
    return new Promise((resolve, reject) => {
        if (!candidateId) {
            reject(new Error("Cannot get candidateId for delete"));
        }

        CandidateModel.findOneAndRemove({userId: userId, candidateId: candidateId}, function (err) {
            if (err) {
                logger.error("Cannot remove candidate, err" + err);
                reject(err);
            }

            resolve();
        });
    });
};