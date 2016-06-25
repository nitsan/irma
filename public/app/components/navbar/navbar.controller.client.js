/**
 * Created by nitsa on 13/02/2016.
 */
angular
    .module('navbar')
    .controller('navbarController', function (AuthService, $state) {
        this.user = AuthService.getUser();

        this.logout = function () {
            AuthService.logout();
            $state.go("login");
        }
    });