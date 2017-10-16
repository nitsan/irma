/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

landingPageConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

function landingPageConfig ($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('candidateLandingPage', {
            url: '/candidate-landing-page/:userId/:candidateId/:meetingId',
            public: true,
            template: '<candidate-landing-page landing-page-data="$resolve.landingPageData"></candidate-landing-page>',
            resolve: {
                landingPageData: function (candidateLandingPageService, $stateParams) {
                    return candidateLandingPageService.getCandidateLandingPageData($stateParams.userId, $stateParams.candidateId, $stateParams.meetingId);
                }
            }
        });
}

angular.module('candidate-landing-page', ['interviewers'])
    .config(landingPageConfig);