/**
 * Created by nitsa on 05/02/2016.
 */
import * as angular from 'angular';

angular
    .module('user')
    .component('login', {
        controller: loginCtrl,
        templateUrl: './login.comp.html'
    });

loginCtrl.$inject= ['$state', 'toastr', 'userService'];

function loginCtrl($state, toastr, userService) {
    let $ctrl = this;
    $ctrl.user;
    $ctrl.login = login;

    $ctrl.$onInit = () => {
        $ctrl.user = {
            email: null,
            password: null
        };
    };

    function login() {
        userService.login($ctrl.user)
            .then(result => {
                if (result) {
                    $state.go('candidateList');
                } else {
                    toastr.error("Cannot login, bad user or password", "Login");
                }
            });
    }
}