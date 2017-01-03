/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let http = require('http'),
    logger = require('winston'),
    _ = require('lodash'),
    co = require('co'),
    TMClient = require('textmagic-rest-client');

const smsService = new TMClient(process.env.SMS_USER, process.env.SMS_TOKEN),
    candidateService = require('./../candidates/candidate.server.service'),
    interviewerService = require('./../interviewer/interviewer.server.service'),
    SmsLogModel = require('./sms-log.server.model'),
    candidateLandingPageService = require('./../candidate-landing-page/candidate-landing-page.server.service.js');

exports.sendSmsToCandidate = function sendSmsToCandidate(userId, candidate) {
    return new Promise((resolve) => {
        logger.info(`Going to send sms to ${candidate.displayName}`);

        candidateLandingPageService.getSmsForCandidate(userId, candidate.candidateId)
            .then(smsText => {
                logger.info("smsText: " + smsText);
                sendSms(candidate.phone, smsText, userId, candidate.candidateId)
                    .then(() => {
                        resolve();
                    });
            });
    });
};

function sendSms(phoneNumbers, smsText, userId, candidateId) {
    return new Promise((resolve, reject) => {
        logger.info(`Going to send sms to: ${phoneNumbers}`);
        smsService.Messages.send({text: smsText, phones: phoneNumbers.toString()}, function (err, response) {
            if (err) {
                logger.error('Error on sending sms', err);
                reject(new Error(`Cannot send sms: ${err.message}`));
            }

            saveSMSLog(userId, candidateId, phoneNumbers, smsText)
                .then(() => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    });
}

function saveSMSLog(userId, candidateId, phoneNumbers, smsText) {
    return new Promise((resolve, reject) => {
        let smsLog = new SmsLogModel({
            userId: userId,
            candidateId: candidateId,
            to: phoneNumbers,
            text: smsText
        });
        smsLog.save()
            .then(() => {
                    resolve();
                },
                err => {
                    logger.error(`Cannot save sms log for candidateId: ${candidateId}, err: ${err}`);
                    reject(err);
                });
    });
}

exports.sendSmsImHere = co.wrap(function*(userId, candidateId) {
    let candidate = yield candidateService.getCandidateById(userId, candidateId);
    let interviewers = yield interviewerService.getInterviewersByIds(candidate.userId, candidate.interviewerIds);
    let smsText = `${candidate.displayName} is here!`;
    let interviewersPhones = _.map(interviewers, 'phone');
    yield sendSms(interviewersPhones, smsText, userId, candidateId);
});