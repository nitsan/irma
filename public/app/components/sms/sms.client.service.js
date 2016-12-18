/**
 * Created by Nitsan Zohar on 29/10/2015.
 */
'use strict';

angular
    .module('sms', [])
    .factory('smsService', smsService);

/* @ngInject */
function smsService($http) {
    let service = {
        sendSMSToCandidate: sendSMSToCandidate,
        sendSMSToInterviewer: sendSMSToInterviewer
    };

    return service;

    ////////////

    function sendSMS(details) {
        return $http.post('/send-sms', details);
    }

    function sendSMSToCandidate(candidate) {
        return new Promise((resolve, reject) => {
            if (candidate && candidate.phone) {
                let details = {
                    to: candidate.phone,
                    sendText: "Hello! See the details on your startApp meeting here: http://10.100.101.105:3001/#/candidate-landing-page/" + candidate.id
                };

                resolve(sendSMS(details));
            } else {
                console.error("candidate is not valid to send sms");
                reject(new Error('Cannot get candidate phone number'));
            }
        });
    }

    function sendSMSToInterviewer(candidate, interviewer) {
        var details = {
            to: interviewer.interviewerPhone,
            sendText: candidate.firstName + " " + candidate.lastName + " is here!"
        };
        return sendSMS(details);
    }
}