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
                candidateTemplate: function (candidateTemplateService) {
                    return candidateTemplateService.getCandidateTemplate();
                },
                candidates: function (candidateListService) {
                    return candidateListService.getCandidates();
                },
                user: function (userService) {
                    return userService.getUser();
                },
                interviewersMap: function (interviewersService) {
                    return interviewersService.getInterviewerMap();
                },
                meetings: function (candidateMeetingsService, candidates) {
                    return candidateMeetingsService.getMeetings(candidates[0].candidateId);
                }
            }
        });
}

angular.module('candidate-template')
    .config(candidateTemplateRoutesConfig);