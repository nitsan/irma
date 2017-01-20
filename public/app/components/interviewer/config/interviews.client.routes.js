/**
 * Created by Nitsan Zohar on 24/12/2015.
 */

angular.module('interviewers')
    .config(function ($stateProvider) {
        $stateProvider
            .state('interviewerList', {
                url: '/interviewerList',
                template: '<interviewer-list interviewer-list="$resolve.interviewerList"></interviewer-list>',
                params: {cache: true},
                resolve: {
                    interviewerList: function (interviewersService, $stateParams) {
                        return interviewersService.getInterviewers($stateParams.cache);
                    }
                }
            });
    });