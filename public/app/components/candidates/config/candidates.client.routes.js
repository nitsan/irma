/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .config(function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('candidateList', {
            url: '/candidateList',
            views: {
                'main': {
                    controller: 'candidateListController as candidateListCtrl',
                    templateUrl: 'app/components/candidates/partials/candidate-list.client.html'
                },
                'sidebar': {
                    templateUrl: 'app/components/sidebar/sidebar.client.html'
                },
                'navbar': {
                    templateUrl: 'app/components/navbar/navbar.client.html'
                }
            },
            resolve: {
                currentAuth: function (AuthService, $state) {
                    return AuthService.getUserAuth()
                        .catch(function () {
                            $state.go("login");
                        });
                }
            }
        })
        .state('createCandidate', {
            url: '/candidate/:candidateId?',
            views: {
                'main': {
                    controller: 'createCandidateController',
                    controllerAs: 'createCandidateCtrl',
                    templateUrl: 'app/components/candidates/partials/create-candidate.client.html',
                    resolve: {
                        requireAuth: function (AuthService) {
                            return AuthService.requireAuth();
                        },
                        candidate: function (candidateListService, $stateParams) {
                            return candidateListService.getCandidateById($stateParams.candidateId);
                        }
                    }
                },
                'sidebar': {
                    templateUrl: 'app/components/sidebar/sidebar.client.html'
                },
                'navbar': {
                    templateUrl: 'app/components/navbar/navbar.client.html'
                }
            }
        });
    ;

    //$state.go('candidateList');
});