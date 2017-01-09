/**
 * Created by Nitsan on 27/10/2016.
 */
'use strict';

angular
    .module('candidates')
    .component('candidateEditor', {
        controller: candidateEditorCtrl,
        templateUrl: 'app/components/candidates/components/candidate-editor/candidate-editor.client.html',
        bindings: {
            candidate: '<',
            interviewers: '<'
        }
    });

/* @ngInject */
function candidateEditorCtrl(candidateSettings, candidateEditorService, $state, toastr, $uibModal, interviewersService) {
    let $ctrl = this;
    $ctrl.saveCandidate = saveCandidate;
    $ctrl.cancel = cancel;
    $ctrl.openIntervieweesModal = openIntervieweesModal;

    $ctrl.$onInit = function () {
        if (typeof $ctrl.candidate.date === 'string') {
            $ctrl.candidate.date = new Date($ctrl.candidate.date);
        }
    };

    function validateForm() { //todo change this to ng-messages
        let validObj = {valid: true};
        for (let requiredField of candidateSettings.requiredFields) {
            if (!$ctrl.candidate[requiredField]) {
                validObj = {field: requiredField, valid: false};
                break;
            }
        }

        return validObj;
    }

    function saveCandidate() {
        let isValid = validateForm();
        if (isValid.valid) {
            candidateEditorService.saveCandidate($ctrl.candidate)
                .then(candidate => {
                    toastr.success(`Candidate ${candidate.firstName} ${candidate.lastName} was save successfully`, "Save");
                    $state.go("candidateList", {cache: false});
                })
                .catch(err => {
                    console.error("Cannot create user, err: " + err.message);
                    toastr.error("Cannot save candidate", "Save Error");
                });

        } else {
            toastr.warning("Candidate is not valid", 'Validation');
            console.warn("Not valid field: " + isValid.field);
        }
    }

    function cancel() {
        $state.go("candidateList");
    }

    function openIntervieweesModal() {
        let modalInstance = $uibModal.open({
            component: 'intervieweesModalComponent',
            size: 'lg',
            resolve: {
                interviewees: function () {
                    return interviewersService.getInterviewers();
                }
            }
        });

        modalInstance.result
            .then(() => {
                interviewersService.getInterviewers()
                    .then(interviewers => {
                        $ctrl.interviewers = interviewers;
                    });
            });
    }
}
