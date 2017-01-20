/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
'use strict';

//External dependencies
require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-sanitize');
require('lodash');
//toastr
require('angular-toastr/dist/angular-toastr.css');
require('angular-toastr');
//angular-ui-bootstrap
require('angular-ui-bootstrap/dist/ui-bootstrap.js');
require('angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');
//ui-select
require('ui-select/dist/select.js');
require('ui-select/dist/select.css');
//textangular
require('textangular/dist/textAngular.css');
require('textangular/dist/textAngular.min.js');
require('textangular/dist/textAngular-sanitize.min.js');
//ng-table
require('ng-table/bundles/ng-table.css');
require('ng-table/bundles/ng-table.js');

//Assets
require('font-awesome/css/font-awesome.css');
require('../app/assets/css/application.css');
require('../app/assets/css/style.css');
//Modules
require('./components/core/core.client.module.js');
require('./components/users/user.client.module.js');
require('./components/interviewer/interviews.client.module.js');
require('./components/candidate-landing-page/candidate-landing-page.client.module.es6');
require('./components/sms/sms.client.module.es6');
require('./components/candidate-template/candidate-template.client.module.js');
require('./components/candidates/candidate.client.module.js');
require('./components/signup/signup.client.module.js');

angular.module('meet', [
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
]).run(function ($rootScope, userService, $location, $state) {
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
}).config(function ($urlRouterProvider) {
    "ngInject";
    $urlRouterProvider.otherwise('/login');
});