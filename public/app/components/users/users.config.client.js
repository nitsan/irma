/**
 * Created by nitsa on 05/02/2016.
 */
angular.module('users', ['meetFireBase']).config(function ($urlRouterProvider,$stateProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            views:{
                'main':{
                    controller: 'loginController as loginCtrl',
                    templateUrl: 'app/components/users/login.html'
                }
            }

        });
});