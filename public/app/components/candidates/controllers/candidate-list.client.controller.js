angular.module('candidates')
    .controller('candidateListController', function($scope, candidateList, candidateListService, createCandidateService, $state, smsService, toastr) {
        this.candidates = candidateList;

        this.editCandidate = function(candidateId){
            //createCandidateService.setCandidate(candidate);
            $state.go("createCandidate", {candidateId: candidateId});
        };

        this.deleteCandidate = function(candidate){
            candidateListService.delete(candidate)
                .then(function(){
                    toastr.success("Candidate " + candidate.firstName + " " + candidate.lastName + "has been deleted", "Delete");
                });
        };

        this.sendSMS = function(candidate){
            smsService.sendSMSToCandidate(candidate);
        }
    });