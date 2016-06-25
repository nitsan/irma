/**
 * Created by nitsan on 19/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('meetFireBase', ["firebase"])
        .run(runBlock)
        .constant("fireBaseConfig", {baseUrl: 'https://meet-irma.firebaseio.com'});

    runBlock.$inject = ['$rootScope', '$state', 'AuthService'];

    function runBlock($rootScope, $state, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (next && next.name !== "login") {
                AuthService.getUserAuth()
                    .catch(function () {
                        $state.go("login");
                    });
            }

        });
    }
})();