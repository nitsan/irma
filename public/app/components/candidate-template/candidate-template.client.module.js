/**
 * Created by nitsa on 14/09/2016.
 */
angular.module('candidate-template', ['textAngular', 'candidates', 'interviewers', 'candidate-landing-page'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('candidateTemplate', {
                url: '/candidateTemplate',
                template: `<candidate-template candidate-template="$resolve.candidateTemplate"
                                               candidates="$resolve.candidates"
                                               user="$resolve.user" 
                                               interviewees-map="$resolve.intervieweesMap">
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
                    intervieweesMap: function (interviewersService) {
                        return interviewersService.getInterviewerMap();
                    }
                }
            });
    });