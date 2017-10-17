/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

candidateRoutesConfig.$inject = ['$stateProvider'];

function candidateRoutesConfig($stateProvider) {

    $stateProvider
        .state('candidateList', {
            url: '/candidateList',
            template: '<candidate-list candidate-list="$resolve.candidateList" interviewer-map="$resolve.interviewerMap"></candidate-list>',
            params: {cache: true},
            resolve: {
                candidateList: ['candidateListService', '$stateParams', function (candidateListService, $stateParams) {
                    return candidateListService.getCandidates($stateParams.cache);
                }],
                interviewerMap: ['interviewersService', function (interviewersService) {
                    return interviewersService.getInterviewerMap();
                }]
            }
        })
        .state('createCandidate', {
            url: '/candidate/:candidateId?',
            template: '<candidate-editor candidate="$resolve.candidate" interviewers="$resolve.interviewers"></candidate-editor>',
            resolve: {
                candidate: ['candidateListService', '$stateParams', function (candidateListService, $stateParams) {
                    return candidateListService.getCandidateById($stateParams.candidateId);
                }],
                interviewers: ['interviewersService', function (interviewersService) {
                    return interviewersService.getInterviewers();
                }]
            }
        }).state('meetingEditor', {
        url: '/candidate/:candidateId/:meetingId',
        params: {candidateId: null, meetingId: null},
        template: '<meeting-editor meeting="$resolve.meeting" interviewers="$resolve.interviewers"></meeting-editor>',
        resolve: {
            meeting: ['candidateMeetingsService', '$stateParams', function (candidateMeetingsService, $stateParams) {
                return candidateMeetingsService.getMeetingById($stateParams.meetingId, $stateParams.candidateId);
            }],
            interviewers: ['interviewersService', function (interviewersService) {
                return interviewersService.getInterviewers();
            }]
        }
    });
}

angular.module('candidates')
    .config(candidateRoutesConfig);
