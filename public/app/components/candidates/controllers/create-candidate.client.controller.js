/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

angular.module('candidates')
    .controller('createCandidateController', function(fireBaseService,$state, candidate, createCandidateService, toastr) {
        var required = ['firstName', 'lastName','candidatePhone','candidatePhone','candidateEmail','interviewerName','date'];
        this.candidate = candidate;
        this.interviewers = fireBaseService.getInterviewers();


        this.validateForm = function(){
            console.log("validateForm!");
            var valid = true;
            for (var i = 0; i < required.length; i++) {
                if (!this.candidate[required[i]]){
                    valid = false;
                    break;
                }
            }

            console.log("valid: " + valid);
            if (valid){
                this.createCandidate();
                $state.go("candidateList");
            } else {
                toastr.warning("Candidate is not valid", 'Validation');
            }
        };

        this.createCandidate = function(){
            //this.candidate.date = moment(this.candidate.date).format();
            //this.candidate.time = moment(this.candidate.time).format();
            //fireBaseService.addCandidate(this.candidate);
            createCandidateService.createCandidate(this.candidate);
            createCandidateService.initCandidate();
        };

        this.cancel = function(){
            $state.go("candidateList");
            createCandidateService.initCandidate();
        }
    });