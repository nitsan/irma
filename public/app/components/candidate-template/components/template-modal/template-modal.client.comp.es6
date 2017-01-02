/**
 * Created by Nitsan on 02/01/2017.
 */
angular.module('candidate-template')
    .component('templateModalComponent', {
        template: `
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title">Template Preview</h3>
        </div>
        <div class="modal-body" id="modal-body">
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="$ctrl.close()">Close</button>
        </div>`,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        /* @ngInject */
        controller: function () {
            let $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.landingPageData = $ctrl.resolve.landingPageData;
            };

            $ctrl.close = function () {
                $ctrl.dismiss();
            };
        }
    });