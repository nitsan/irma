angular.module('candidates')
    .controller('candidateListController', function($scope, candidateListService, createCandidateService, $state, smsService, toastr) {
        //this.candidates = candidateListService.getCandidates();
        //this.candidates = fireBaseService.getCandidates();


        //candidateListService.getCandidates().then(function(candidates){
        //    this.candidates = candidates;
        //}.bind(this));

        this.candidates = candidateListService.getCandidates();

        //this.getCandidatesFunc = fireBaseService.getCandidates;
        //
        //$scope.$watch(this.getCandidatesFunc() ,function(newVal){
        //   if (newVal){
        //       this.candidates = newVal;
        //   }
        //}.bind(this));

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