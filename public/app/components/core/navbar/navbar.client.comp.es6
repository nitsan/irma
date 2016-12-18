/**
 * Created by nitsa on 10/11/2016.
 */
/**
 * Created by Nitsan on 27/10/2016.
 */
'use strict';

angular
    .module('core')
    .component('navBar', {
        controller: navBarCtrl,
        templateUrl: 'app/components/core/navbar/navbar.client.html'

    });

/* @ngInject */
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