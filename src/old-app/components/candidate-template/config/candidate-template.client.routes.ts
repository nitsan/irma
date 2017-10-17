/**
 * Created by nitsa on 14/09/2016.
 */
candidateTemplateRoutesConfig.$inject = ['$stateProvider'];

function candidateTemplateRoutesConfig($stateProvider) {
    $stateProvider
        .state('candidateMessageTemplate', {
            url: '/candidateMessageTemplate',
            template: `<candidate-template candidate-template="$resolve.candidateTemplate"
                                               candidates="$resolve.candidates"
                                               user="$resolve.user" 
                                               interviewers-map="$resolve.interviewersMap"
                                               meetings="$resolve.meetings">
                           </candidate-template>`,
            params: {cache: true},
            resolve: {
                candidateTemplate: ['candidateTemplateService', function (candidateTemplateService) {
                    return candidateTemplateService.getCandidateTemplate();
                }],
                candidates: ['candidateListService', function (candidateListService) {
                    return candidateListService.getCandidates();
                }],
                user: ['userService', function (userService) {
                    return userService.getUser();
                }],
                interviewersMap: ['interviewersService', function (interviewersService) {
                    return interviewersService.getInterviewerMap();
                }],
                meetings: ['candidateMeetingsService', 'candidates', function (candidateMeetingsService, candidates) {
                    return candidateMeetingsService.getMeetings(candidates[0].candidateId);
                }]
            }
        });
}

angular.module('candidate-template')
    .config(candidateTemplateRoutesConfig);