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
        sendSMSToInterviewers: sendSMSToInterviewers
    };

    return service;

    ////////////

    function sendSMS(details) {
        return $http.post('/send-sms', details);
    }

    function sendSMSToCandidate(candidate) {
        console.log("In sendSMSToCandidate");
        return new Promise((resolve, reject) => {
            if (candidate && candidate.phone) {
                resolve(sendSMS({candidate: candidate}));
            } else {
                console.error("candidate is not valid to send sms");
                reject(new Error('Cannot get candidate phone number'));
            }
        });
    }

    function sendSMSToInterviewers(userId, candidateId) {
        return $http.post(`/send-sms-im-here/${userId}/${candidateId}`);
    }
}