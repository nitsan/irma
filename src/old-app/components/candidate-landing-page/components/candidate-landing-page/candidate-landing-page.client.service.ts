/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
import * as angular from 'angular';

angular.module('candidate-landing-page')
    .factory('candidateLandingPageService', candidateLandingPageService);

/* @ngInject */
function candidateLandingPageService(smsService, $http) {

    let service = {
        imHere: imHere,
        getCandidateLandingPageData: getCandidateLandingPageData
    };

    return service;


    function imHere(userId, candidateId) {
        return smsService.sendSMSToInterviewers(userId, candidateId);
    }

    function getCandidateLandingPageData(userId, candidateId, meetingId) {
        return $http.get(`/api/candidate-landing-data/${userId}/${candidateId}/${meetingId}`)
            .then(response => {
                return response.data;
            });
    }
}