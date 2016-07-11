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
    $rootScope.$on('$stateChangeStart', function (event, next) {
        // if (!AuthService.getUser() && next.name !== "login"){
        //     event.preventDefault();
        //     $state.go('login');
        // }
    });
}).config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');

    // $stateProvider
    //     .state('home', {
    //         url: '/',
    //         resolve: {
    //             nextState: function (AuthService, $state) {
    //                 console.info("in home state");
    //                 // var nextState = AuthService.getUser() ? "candidateList" : "login";
    //                 // console.info("in home state, going to: " + nextState);
    //                 // $state.go(nextState);
    //                 return AuthService.getUser() ? "candidateList" : "login";
    //             }
    //         },
    //         controller: function setInitialStateController(AuthService, $state, nextState) {
    //             console.info("In setInitialStateController");
    //             // var nextState = AuthService.getUser() ? "candidateList" : "login";
    //             console.info("in home state, going to: " + nextState);
    //             return $state.go(nextState);
    //         }
    //     });

    // $state.go('login');
});