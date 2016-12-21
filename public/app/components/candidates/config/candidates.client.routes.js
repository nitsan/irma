/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .config(function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('candidateList', {
                url: '/candidateList',
                template: '<candidate-list candidate-list="$resolve.candidateList" interviewer-map="$resolve.interviewerMap"></candidate-list>',
                params: {cache: true},
                resolve: {
                    candidateList: function (candidateListService, $stateParams) {
                        return candidateListService.getCandidates($stateParams.cache);
                    },
                    interviewerMap: function (interviewersService) {
                        return interviewersService.getInterviewerMap();
                    }
                }
            })
            .state('createCandidate', {
                url: '/candidate/:candidateId?',
                template: '<candidate-editor candidate="$resolve.candidate" interviewers="$resolve.interviewers"></candidate-editor>',
                resolve: {
                    candidate: function (candidateListService, $stateParams) {
                        return candidateListService.getCandidateById($stateParams.candidateId);
                    },
                    interviewers: function (interviewersService) {
                        return interviewersService.getInterviewers();
                    }
                }
            });
    });