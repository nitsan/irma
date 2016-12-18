/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .config(function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('candidateList', {
                url: '/candidateList',
                template: '<candidate-list candidate-list="$resolve.candidateList"></candidate-list>',
                params: {cache: true},
                resolve: {
                    candidateList: function (candidateListService, $stateParams) {
                        return candidateListService.getCandidates($stateParams.cache);
                    }
                }
            })
            .state('createCandidate', {
                url: '/candidate/:candidateId?',
                template: '<candidate-editor candidate="$resolve.candidate"></candidate-editor>',
                resolve: {
                    candidate: function (candidateListService, $stateParams) {
                        return candidateListService.getCandidateById($stateParams.candidateId);
                    }
                }
            });
    });