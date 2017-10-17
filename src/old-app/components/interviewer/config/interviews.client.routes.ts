/**
 * Created by Nitsan Zohar on 24/12/2015.
 */

interviewsRoutesConfig.$inject = ['$stateProvider'];

function interviewsRoutesConfig($stateProvider) {
    $stateProvider
        .state('interviewerList', {
            url: '/interviewerList',
            template: '<me-interviewer-list [interviewer-list]="$resolve.interviewerList"></me-interviewer-list>',
            params: {cache: true},
            resolve: {
                interviewerList: ['interviewersService', '$stateParams', function (interviewersService, $stateParams) {
                    return interviewersService.getInterviewers($stateParams.cache);
                }]
            }
        });
}

angular.module('interviewers')
    .config(interviewsRoutesConfig);
