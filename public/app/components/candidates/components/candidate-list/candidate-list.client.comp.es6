/**
 * Created by Nitsan on 27/10/2016.
 */
'use strict';

angular
    .module('candidates')
    .component('candidateList', {
        controller: candidateListCtrl,
        templateUrl: 'app/components/candidates/components/candidate-list/candidate-list.client.html',
        bindings: {
            candidateList: '='
        }
    });

/* @ngInject */
function candidateListCtrl(candidateListService, smsService, $state, toastr) {
    let $ctrl = this;
    $ctrl.editCandidate = editCandidate;
    $ctrl.deleteCandidate = deleteCandidate;
    $ctrl.sendSMS = sendSMS;

    function editCandidate(candidate) {
        $state.go("createCandidate", {candidateId: candidate.candidateId});
    }

    function deleteCandidate(candidate) {
        let modalInstance = candidateListService.createModal('Confirm Delete', `Are you sure you want to delete ${candidate.firstName} ${candidate.lastName}?`);

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

    function sendSMS(candidate) {
        let modalSms = candidateListService.createModal('Confirm SMS', `Are you sure you want to send SMS ${candidate.firstName} ${candidate.lastName}?`);

        modalSms.result
            .then(approve => {
                if (approve) {
                    smsService.sendSMSToCandidate(candidate)
                        .then(() => {
                            toastr.success(`SMS was sent to candidate ${candidate.firstName} ${candidate.lastName}`, "SMS");
                        });
                }
            });
    }
}
