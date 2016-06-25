/**
 * Created by nitsa on 05/02/2016.
 */
angular.module('users')
    .controller('loginController', function (AuthService, $state, toastr) {
        this.user = {
            email: null,
            password: null
        };

        this.login = function () {
            //$state.go('candidateList');
            AuthService.login(this.user)
                .then(function (result) {
                    if (result.token) {
                        $state.go('candidateList');
                    } else {
                        toastr.error("Cannot login");
                    }
                });
        }
    });