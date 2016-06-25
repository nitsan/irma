/**
 * Created by Nitsan Zohar on 29/10/2015.
 */
angular.module('sms', [])
    .factory('smsService', function($http) {

        var smsService = {
            sendSMS: function(details){
                if (details) {
                    $http.post('/send-sms', details).then(function (val) {
                            console.log(val);
                        },
                        function (err) {
                            console.log(err);
                        });
                } else {
                    console.log("details is missing, cannot send sms");
                }
            },
            sendSMSToCandidate: function(candidate){
                if (candidate && candidate.candidatePhone) {
                    var details = {to: candidate.candidatePhone, sendText : "Hello! See the details on your startApp meeting here: http://10.100.101.105:3001/#/candidate-landing-page/" + candidate.id};
                    this.sendSMS(details);
                } else {
                    console.log("candidate is not valid to send sms");
                }
            },
            sendSMSToInterviewer: function(candidate, interviewer){
                var details = {to: interviewer.interviewerPhone, sendText : candidate.firstName + " " + candidate.lastName + " is here!"};
                this.sendSMS(details);
            }
        };

        return smsService;
    }
);
