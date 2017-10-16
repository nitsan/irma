/**
 * Created by nitsa on 05/02/2016.
 */

userRoutesConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

function userRoutesConfig($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            public: true,
            template: '<login></login>'
        });
}

angular.module('user')
    .config(userRoutesConfig);