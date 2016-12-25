/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let http = require('http'),
    logger = require('winston'),
    _ = require('lodash'),
    co = require('co'),
    ip = require('ip');

const candidateService = require('./../candidates/candidate.server.service'),
    interviewerService = require('./../interviewer/interviewer.server.service'),
    SmsLogModel = require('./sms-log.server.model');

const serverAddress = process.env.NODE_ENV === 'prod' ? 'http://meet3.herokuapp.com' : `http://${ip.address()}:${process.env.PORT}`;

exports.sendSmsToCandidate = function sendSmsToCandidate(userId, candidate) {
    return new Promise((resolve) => {
        logger.info(`Going to send sms to ${candidate.displayName}`);

        let smsText = buildSmsText(userId, candidate);
        console.log("smsText: " + smsText);
        sendSms(candidate.phone, smsText, userId, candidate.candidateId)
            .then(() => {
                resolve();
            });
    });
};

function sendSms(phoneNumbers, smsText, userId, candidateId) {
    return new Promise((resolve, reject) => {
        let options = {
            host: process.env.SMS_HOST,
            path: `/http/sendmsg?api_id=${process.env.SMS_API_ID}&user=${process.env.SMS_USER}&password=${process.env.SMS_PASSWORD}&to=${phoneNumbers}&text=${smsText.replace(/ /g, "%20").replace(/#/g, "%23")}&from=${process.env.SMS_FROM}`
        };

        logger.debug("full path: " + options.host + options.path);

        http.get(options, function (res) {
            logger.info(`SMS status: ${res.statusCode}, headers: ${JSON.stringify(res.headers)}`);
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
    });
}

function buildSmsText(userId, candidate) {
    return `${serverAddress}/#/candidate-landing-page/${userId}/${candidate.candidateId}`;
}

exports.sendSmsImHere = co.wrap(function*(userId, candidateId) {
    let candidate = yield candidateService.getCandidateById(userId, candidateId);
    let interviewers = yield interviewerService.getInterviewersByIds(candidate.userId, candidate.interviewerIds);
    let smsText = `${candidate.displayName} is here!`;
    let interviewersPhones = _.map(interviewers, 'phone');
    yield sendSms(interviewersPhones, smsText, userId, candidateId);
});