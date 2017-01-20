/**
 * Created by Nitsan on 02/01/2017.
 */
require('./interviewers-modal.css');

angular.module('interviewers')
    .component('intervieweesModalComponent', {
        template: `
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title">Interviewees List</h3>
        </div>
        <div class="modal-body">
            <interviewers-table interviewer-list="$ctrl.resolve.interviewees"></interviewers-table>
        </div>
        <div class="modal-footer margin-footer">
            <button class="btn btn-primary" type="button" ng-click="$ctrl.close()">Close</button>
        </div>`,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });