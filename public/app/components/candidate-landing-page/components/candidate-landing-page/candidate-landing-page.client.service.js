/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidate-landing-page')
    .factory('candidateLandingPageService', candidateLandingPageService);

function candidateLandingPageService(smsService, $http) {

    let service = {
        imHere: imHere,
        getCandidateLandingPageData: getCandidateLandingPageData
    };

    return service;


    function imHere(userId, candidateId) {
        return smsService.sendSMSToInterviewers(userId, candidateId);
    }

    function getCandidateLandingPageData(userId, candidateId) {
        return $http.get(`/api/candidate-landing-data/${userId}/${candidateId}`)
            .then(response => {
                return response.data;
            });
    }
}