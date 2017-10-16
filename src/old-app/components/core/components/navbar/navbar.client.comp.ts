/**
 * Created by Nitsan on 27/10/2016.
 */
import * as angular from 'angular';
angular
    .module('core')
    .component('navBar', {
        controller: navBarCtrl,
        templateUrl: './navbar.client.html'

    });

navBarCtrl.$inject= ['$scope', 'userService', '$state', 'toastr'];

function navBarCtrl($scope, userService, $state, toastr) {
    let $ctrl = this;
    $ctrl.logout = logout;

    function logout() {
        console.info("In logout");
        userService.logout()
            .then(function () {
                $state.go("login");
                $scope.$emit('logout');
            })
            .catch(function () {
                toastr.error("Cannot logout, please try again later", "Logout");
            });
    };
}