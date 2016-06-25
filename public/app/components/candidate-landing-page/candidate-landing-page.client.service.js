/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidate-landing-page')
    .factory('candidateLandingPageService', function(fireBaseService, smsService) {

        var candidateLandingPageService = {
            getCandidates: function(){
                return fireBaseService.getCandidates2();
            },
            imHere: function(candidate){
                var interviewers = fireBaseService.getInterviewers();
                var interviewer =  _.find(interviewers, {interviewerName: candidate.interviewerName});
                if (interviewer) {
                    smsService.sendSMSToInterviewer(candidate, interviewer);
                } else {
                    console.log("Cannot find interviewer: " + candidate.interviewerName);
                }
            }
        };

        return candidateLandingPageService;
    });
