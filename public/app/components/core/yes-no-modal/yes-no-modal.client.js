/**
 * Created by Nitsan on 14/12/2016.
 */
angular.module('core')
    .component('modalComponent', {
        template: `
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title">{{::$ctrl.title}}</h3>
        </div>
        <div class="modal-body" id="modal-body">
            <p>{{::$ctrl.bodyText}}</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>
        </div>`,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function () {
            var $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.title = $ctrl.resolve.title;
                $ctrl.bodyText = $ctrl.resolve.bodyText;
            };

            $ctrl.ok = function () {
                $ctrl.close({$value: true});
            };

            $ctrl.cancel = function () {
                $ctrl.close({$value: false});
            };
        }
    });