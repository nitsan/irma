/**
 * Created by Nitsan on 19/12/2016.
 */
'use strict';

angular
    .module('interviewers')
    .component('interviewerList', {
        controller: interviewerListCtrl,
        templateUrl: 'app/components/interviewer/components/interviewer-list/interviewer-list.client.html',
        bindings: {
            interviewerList: '='
        }
    });

/* @ngInject */
function interviewerListCtrl(NgTableParams, interviewerSettings, interviewersService, toastr, yesNoModalService) {
    let $ctrl = this;
    $ctrl.addLine = addLine;
    $ctrl.editRow = editRow;
    $ctrl.saveLine = saveLine;
    $ctrl.cancel = cancel;
    $ctrl.deleteRow = deleteRow;

    this.$onInit = () => {
        $ctrl.cols = angular.copy(interviewerSettings.cols);
        $ctrl.tableParams = new NgTableParams({}, {
            dataset: $ctrl.interviewerList
        });
    };

    function addLine() {
        let newRow = {
            $isNew: true,
            $isEditing: true
        };
        $ctrl.originalRow = newRow;
        $ctrl.tableParams.settings().dataset.unshift(newRow);
        $ctrl.tableParams.reload();
    }

    function saveLine(row, rowForm) {
        // delete row.$isEditing;

        interviewersService.saveInterviewer(row)
            .then(interviewer => {
                rowForm.$setPristine();
                $ctrl.originalRow = null;
                toastr.success(`Interviewer ${interviewer.firstName} ${interviewer.lastName} was save successfully`, "Save");
            })
            .catch(err => {
                row.$isEditing = true;
                toastr.error("Cannot save interviewer", "Save Error");
            });
    }

    function cancel(row, rowForm) {
        if (row.$isNew) {
            deleteRow(row);
        } else {
            angular.copy($ctrl.originalRow, row);
        }

        rowForm.$setPristine();
        $ctrl.originalRow = null;
    }

    function deleteRow(row) {
        if (row.$isNew) {
            removeRowFromTable(row);
        } else {
            let confirmDeleteModal = yesNoModalService.createModal('Confirm Delete', `Are you sure you want to delete ${row.displayName}?`);

            confirmDeleteModal.result
                .then(approve => {
                    if (approve) {
                        interviewersService.deleteInterviewer(row)
                            .then(() => {
                                toastr.success(`Interviewer ${row.displayName} has been deleted`, "Delete");
                                removeRowFromTable(row);
                            })
                            .catch(err => {
                                toastr.error(`Cannot delete interviewer ${row.displayName}`, "Delete");
                            });
                    }
                });
        }
    }

    function removeRowFromTable(row) {
        _.remove($ctrl.tableParams.settings().dataset, (item) => {
            return row === item;
        });

        $ctrl.tableParams.reload();
    }

    function editRow(row) {
        console.log("id", row.interviewerId);
        console.log("Edit row", row);
        if ($ctrl.originalRow) {
            return toastr.pop('warning', 'Please close other edit line before editing new line');
        }

        $ctrl.originalRow = angular.copy(row);
        row.$isEditing = true;
    }
}