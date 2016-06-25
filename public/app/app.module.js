/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

angular.module('meet', [
    'ngAnimate',
    'toastr',
    'ui.router',
    'candidates',
    'user-list',
    'calendar',
    'meetFireBase',
    'candidate-landing-page',
    'sms',
    'ngSanitize',
    'ui.select',
    'users',
    'navbar'
]).run(function ($rootScope, $location, AuthService, $state) {
    //$rootScope.$on('$stateChangeStart', function (event, next) {
    //    var authorizedRoles = next.data.authorizedRoles;
    //    if (!AuthService.isAuthorized(authorizedRoles)) {
    //        event.preventDefault();
    //        if (AuthService.isAuthenticated()) {
    //            // user is not allowed
    //            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
    //        } else {
    //            // user is not logged in
    //            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    //        }
    //    }
    //});
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
        console.log("In $routeChangeError");
        if (error === "AUTH_REQUIRED") {
            console.log("In AUTH_REQUIRED");
            //$location.path("/home");
            $state.go("login");
        }
    });
}).config(function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            resolve: {
                currentAuth: function (AuthService, $state) {
                    return AuthService.requireAuth().then(function () {
                        console.log("already logged in, go to login");
                        $state.go("candidateList");
                    });
                }
            }
        });

    //$state.go('candidateList');
});