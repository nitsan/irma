/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let logger = require('winston');

let InterviewerModel = require('./interviewer.server.model'),
    Counters = require('./../auto-increment/counters.server.model.js'),
    candidateService = require('./../../modules/candidates/candidate.server.service.js');

exports.getInterviewerById = function getInterviewerById(userId, interviewerId) {
    return new Promise((resolve, reject) => {
        logger.profile(`Get interviewer [${interviewerId}] for user: [${userId}]`);
        InterviewerModel.findOne({userId: userId, interviewerId: interviewerId}).exec()
            .then(interviewer => {
                logger.profile(`Get interviewer [${interviewerId}] for user: [${userId}]`);
                resolve(interviewer);
            }, err => {
                reject(err);
            });
    });
};

exports.getInterviewersByIds = function getInterviewersByIds(userId, interviewersIds) {
    return new Promise((resolve, reject) => {
        logger.profile(`Get interviewers [${interviewersIds}] for user: [${userId}]`);
        InterviewerModel.find({userId: userId, interviewerId: {$in: interviewersIds}}).exec()
            .then(interviewers => {
                logger.profile(`Get interviewers [${interviewersIds}] for user: [${userId}]`);
                resolve(interviewers);
            }, err => {
                reject(err);
            });
    });
};

exports.getInterviewers = function getInterviewers(userId) {
    return new Promise((resolve, reject) => {
        logger.profile("Get interviewers for user: " + userId);
        InterviewerModel.find({userId: userId}).exec()
            .then(interviewers => {
                logger.profile("Get interviewers for user: " + userId);
                resolve(interviewers);
            }, err => {
                reject(err);
            });
    });
};
exports.saveInterviewer = function saveInterviewer(userId, interviewer) {
    return interviewer.interviewerId ? updateInterviewer(userId, interviewer) : createInterviewer(userId, interviewer);
};

function createInterviewer(userId, interviewer) {
    return new Promise((resolve, reject) => {
        if (!interviewer) {
            reject(new Error("Cannot get interviewer for create"));
        }

        interviewer.userId = userId;
        interviewer.updateDate = new Date().getTime();

        Counters.getNextSequence('interviewerId')
            .then(interviewerId => {
                interviewer.interviewerId = interviewerId;
                let newInterviewer = new InterviewerModel(interviewer);

                newInterviewer.save(function (err, interviewer) {
                    if (err) {
                        logger.error("Cannot create interviewer, err" + err);
                        reject(err);
                    }

                    resolve(interviewer);
                });
            });
    });
}

function updateInterviewer(userId, interviewer) {
    return new Promise((resolve, reject) => {
        if (!interviewer) {
            reject(new Error("Cannot get interviewer for update"));
        }

        interviewer.userId = userId;
        interviewer.updateDate = new Date().getTime();

        InterviewerModel.findOneAndUpdate({
            userId: interviewer.userId,
            interviewerId: interviewer.interviewerId
        }, interviewer, function (err, updatedCandidate) {
            if (err) {
                logger.error("Cannot update interviewer, err" + err);
                reject(err);
            }

            resolve(updatedCandidate);
        });
    });
}

exports.deleteInterviewer = function deleteInterviewer(userId, interviewerId) {
    return new Promise((resolve, reject) => {
        if (!interviewerId) {
            reject(new Error("Cannot get interviewerId for delete"));
        }

        InterviewerModel.findOneAndRemove({userId: userId, interviewerId: interviewerId}, function (err) {
            if (err) {
                logger.error("Cannot remove interviewer, err" + err);
                reject(err);
            }

            candidateService.removeDeletedInterviewers(userId, interviewerId)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });

        });
    });
};