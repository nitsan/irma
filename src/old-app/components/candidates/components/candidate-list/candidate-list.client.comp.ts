/**
 * Created by Nitsan on 27/10/2016.
 */
'use strict';

angular
    .module('candidates')
    .component('candidateList', {
        controller: candidateListCtrl,
        templateUrl: './candidate-list.client.html',
        bindings: {
            candidateList: '=',
            interviewerMap: '<'
        }
    });

/* @ngInject */
function candidateListCtrl(candidateListService, yesNoModalService, smsService, $state, toastr) {
    let $ctrl = this;
    $ctrl.editCandidate = editCandidate;
    $ctrl.deleteCandidate = deleteCandidate;
    $ctrl.getInterviewers = getInterviewers;

    function editCandidate(candidate) {
        $state.go("createCandidate", {candidateId: candidate.candidateId});
    }

    function deleteCandidate(candidate) {
        let modalInstance = yesNoModalService.createModal('Confirm Delete', `Are you sure you want to delete ${candidate.firstName} ${candidate.lastName}?`);

        modalInstance.result
            .then(approve => {
                if (approve) {
                    candidateListService.delete(candidate)
                        .then(() => {
                            toastr.success(`Candidate ${candidate.firstName} ${candidate.lastName} has been deleted`, "Delete");
                        });
                }
            });
    }

    function getInterviewers(candidate) {
        let interviewers = [];
        if (candidate.interviewerIds){
            for (let interviewerId of candidate.interviewerIds) {
                let interviewer = $ctrl.interviewerMap[interviewerId];
                if (interviewer) {
                    interviewers.push(interviewer.displayName);
                }
            }
        }

        return interviewers.toString();
    }
}
