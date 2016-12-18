/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidate-landing-page', ['interviewers']).config(function ($urlRouterProvider,$stateProvider) {

    $stateProvider
        .state('candidateLandingPage', {
            url: '/candidate-landing-page/:candidateId',
            views:{
                'main':{
                    controller: 'candidateLandingPageController as candidateLandingPageCtrl',
                    templateUrl: 'candidate-landing-page/candidate-landing-page.client.html',
                    resolve: {
                        candidate: function($stateParams, candidateListService){
                            return candidateListService.getCandidateById($stateParams.candidateId);
                        }
                    }
                }
            }

        });
});