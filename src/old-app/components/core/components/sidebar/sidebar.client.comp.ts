/**
 * Created by nitsa on 10/11/2016.
 */
/**
 * Created by Nitsan on 27/10/2016.
 */
import * as angular from 'angular';

angular
    .module('core')
    .component('sideBar', {
        controller: sideBarCtrl,
        templateUrl: './sidebar.client.html'
    });

/* @ngInject */
function sideBarCtrl($scope, $state) {
    let $ctrl = this;

    this.$onInit = () => {
        $ctrl.selected = $state.current.name;
        $scope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState) {
                $ctrl.selected = toState.name;
            }
        });
    };
}