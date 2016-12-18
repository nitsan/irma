/**
 * Created by nitsa on 05/02/2016.
 */
angular.module('user')
    .config(function ($urlRouterProvider, $stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                public: true,
                controller: 'loginController',
                controllerAs: 'loginCtrl',
                templateUrl: 'app/components/users/login.html'
            });
    });