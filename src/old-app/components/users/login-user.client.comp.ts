/**
 * Created by nitsa on 05/02/2016.
 */
import * as angular from 'angular';

const template = require('./login.comp.html');

angular
    .module('user')
    .component('login', {
        controller: loginCtrl,
        template: template
    });

loginCtrl.$inject = ['$state', 'toastr', 'userService'];

function loginCtrl($state, toastr, userService) {
    const $ctrl = this;
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
