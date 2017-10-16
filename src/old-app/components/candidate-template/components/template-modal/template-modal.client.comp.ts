/**
 * Created by Nitsan on 05/01/2017.
 */
import * as angular from 'angular';

angular.module('candidate-template')
    .component('templateModalComponent', {
        template: `
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title">Template Preview</h3>
        </div>
        <div class="modal-body" id="modal-body"></div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="$ctrl.dismiss()">Close</button>
        </div>`,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function () {
            let $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.landingPageData = $ctrl.resolve.landingPageData;
            };
        }
    });