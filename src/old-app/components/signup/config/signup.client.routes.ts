/**
 * Created by Nitsan on 26/12/2016.
 */
signupRoutesConfig.$inject = ['$stateProvider'];

function signupRoutesConfig($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            public: true,
            template: '<sign-up></sign-up>'
        });
}

angular.module('signup')
    .config(signupRoutesConfig);