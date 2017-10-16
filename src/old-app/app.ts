/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
import * as angular from 'angular';
//External dependencies
require('angular-ui-router');
require('angular-animate');
require('angular-sanitize');
require('lodash');
//toastr
require('angular-toastr');
//angular-ui-bootstrap
require('angular-ui-bootstrap/dist/ui-bootstrap.js');
require('angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');
//ui-select
require('ui-select/dist/select.js');
//textangular
require('textangular/dist/textAngular.min.js');
require('textangular/dist/textAngular-sanitize.min.js');
//ng-table
require('ng-table/bundles/ng-table.js');

//Modules
require('./components/core/core.client.module');
require('./components/users/user.client.module');
require('./components/interviewer/interviews.client.module');
require('./components/candidate-landing-page/candidate-landing-page.client.module');
require('./components/sms/sms.client.module');
require('./components/candidate-template/candidate-template.client.module');
require('./components/candidates/candidate.client.module');
require('./components/signup/signup.client.module');

require('./components/core/components/meet/meet.client.comp');



const app = angular.module('meet', [
    'ngAnimate',
    'toastr',
    'ui.router',
    'core',
    'candidates',
    // 'calendar',
    'candidate-landing-page',
    'sms',
    'ngSanitize',
    'ui.select',
    'user',
    'signup',
    'candidate-template',
    'interviewers'
]);

app.run(function ($rootScope, userService, $location, $state) {
    "ngInject";
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
});

app.config(function ($urlRouterProvider) {
    "ngInject";
    $urlRouterProvider.otherwise('/login');
});