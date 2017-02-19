"use strict";

let logger = require('winston');

const MeetingsModel = require('./meetings.server.model'),
    Counters = require('./../auto-increment/counters.server.model.js');

exports.getMeetingsByCandidateId = function getMeetingsByCandidateId(userId, candidateId) {
    return new Promise((resolve, reject) => {
        logger.profile(`Get meetings for candidate [${candidateId}] for user: [${userId}]`);
        MeetingsModel.find({userId: userId, candidateId: candidateId}).exec()
            .then(meetings => {
                logger.profile(`Get meetings for candidate [${candidateId}] for user: [${userId}]`);
                resolve(meetings);
            })
            .catch(err => {
                reject(err);
            });
    });
};

exports.createMeeting = function createMeeting(userId, candidateId, meeting) {
    return new Promise((resolve, reject) => {
        if (!meeting) {
            return reject(new Error("Cannot get meeting for create"));
        }

        meeting.userId = userId;
        meeting.candidateId = candidateId;

        Counters.getNextSequence('meetingId')
            .then(meetingId => {
                meeting.meetingId = meetingId;
                let newMeeting = new MeetingsModel(meeting);

                newMeeting.save((err, meeting) => {
                    if (err) {
                        logger.error("Cannot create candidate, err" + err);
                        return reject(err);
                    }

                    resolve(meeting);
                });
            });
    });
};

exports.deleteMeeting = function deleteMeeting(userId, candidateId, meetingId) {
    return new Promise((resolve, reject) => {
        if (!userId || !candidateId || !meetingId) {
            return reject(new Error("Cannot get userId/candidateId/meetingId for delete"));
        }

        MeetingsModel.findOneAndRemove({userId: userId, candidateId: candidateId, meetingId: meetingId}, (err) => {
            if (err) {
                logger.error(`Cannot delete meeting: ${meetingId}, err: ${err.message}`);
                return reject("Cannot delete meeting");
            }

            resolve({success: true});
        });
    });
};