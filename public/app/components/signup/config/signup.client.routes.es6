/**
 * Created by Nitsan on 26/12/2016.
 */
angular.module('signup')
    .config(function ($stateProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                public: true,
                template: '<sign-up></sign-up>'
            });
    });