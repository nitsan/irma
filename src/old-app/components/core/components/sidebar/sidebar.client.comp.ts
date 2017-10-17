/**
 * Created by Nitsan on 27/10/2016.
 */
import * as angular from 'angular';

const template = require('./sidebar.client.html');

angular
    .module('core')
    .component('sideBar', {
        controller: sideBarCtrl,
        template: template
    });

sideBarCtrl.$inject = ['$scope', '$state'];

function sideBarCtrl($scope, $state) {
    const $ctrl = this;

    this.$onInit = () => {
        $ctrl.selected = $state.current.name;
        $scope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState) {
                $ctrl.selected = toState.name;
            }
        });
    };
}
