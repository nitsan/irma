/**
 * Created by nitsa on 05/02/2016.
 */
angular.module('user')
    .controller('loginController', function ($scope, $state, toastr, userService) {
        this.user = {
            email: null,
            password: null
        };

        this.login = function () {
            userService.login(this.user)
                .then(function (result) {
                    if (result) {
                        $state.go('candidateList');
                    } else {
                        toastr.error("Cannot login, bad user or password", "Login");
                    }
                });
        }
    });