/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

angular.module('meet', [
    'ngAnimate',
    'toastr',
    'ui.router',
    'core',
    'candidates',
    'user-list',
    'calendar',
    'candidate-landing-page',
    'sms',
    'ngSanitize',
    'ui.select',
    'user',
    'signup',
    'candidate-template',
    'interviewers'
]).run(function ($rootScope, userService, $location, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        // console.log(`Go to ${toState.name}, from ${fromState ? fromState.name : 'none'}`);
        if (!toState.approved) {
            event.preventDefault();
            toState.approved = true;
            userService.getUser()
                .then(user => {
                    if (Object.keys(user).length) {
                        $state.go(toState.public ? 'candidateList' : toState.name, toParams)
                            .then(() => {
                                toState.approved = false;
                            });
                    } else {
                        $state.go(toState.public ? toState.name : 'login', toParams)
                            .then(() => {
                                toState.approved = false;
                            });
                    }
                });
        }
    });
}).config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
});