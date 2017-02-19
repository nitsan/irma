/**
 * Created by nitsa on 24/01/2017.
 */
'use strict';
require('./candidate-table.scss');

angular
    .module('candidates')
    .component('candidateTable', {
        controller: candidateTableCtrl,
        templateUrl: 'app/components/candidates/components/candidate-table/candidate-table.client.html',
        bindings: {
            candidateList: '<',
            filterText: '<'
        }
    });

/* @ngInject */
function candidateTableCtrl(NgTableParams, $state, yesNoModalService, candidateListService, toastr) {
    let $ctrl = this;
    $ctrl.candidateTableParams;
    $ctrl.editCandidate = editCandidate;
    $ctrl.deleteCandidate = deleteCandidate;

    $ctrl.$onInit = () => {
        $ctrl.candidateTableParams = createTable();
    };

    $ctrl.$onChanges = (changeObj) => {
        if (changeObj.filterText.currentValue || changeObj.filterText.currentValue === '') {
            $ctrl.candidateTableParams.filter({$: changeObj.filterText.currentValue})
        }
    };

    function createTable() {
        let initialParams = {
            count: 5 // initial page size
        };
        let initialSettings = {
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: $ctrl.candidateList
        };

        return new NgTableParams(initialParams, initialSettings);
    }

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
}



