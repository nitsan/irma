/**
 * Created by Nitsan Zohar on 29/10/2015.
 */
'use strict';

angular
    .module('sms', [])
    .factory('smsService', smsService);

smsService.$inject= ['$http'];

function smsService($http) {
    let service = {
        sendSMS: sendSMS,
        sendSMSToInterviewers: sendSMSToInterviewers
    };

    return service;

    ////////////

    function sendSMS(meetingId) {
        return $http.post(`/api/send-sms/${meetingId}`);
    }

    function sendSMSToInterviewers(userId, candidateId) {
        return $http.post(`/send-sms-im-here/${userId}/${candidateId}`);
    }
}