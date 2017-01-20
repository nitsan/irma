/**
 * Created by nitsan on 10/11/2016.
 */
'use strict';

angular
    .module('core')
    .component('meet', {
        controller: meetCtrl,
        template: `
        <div class="logo">
            <img class="meet-logo" src="app/assets/img/meet-logo.png">
            <!--<h4><a href="index.html">Meet</a></h4>-->
        </div>
        <side-bar ng-if="$ctrl.isLoggedIn"></side-bar>
        <div class="wrap">
            <header class="page-header">
                <nav-bar ng-if="$ctrl.isLoggedIn"></nav-bar>
            </header>
            <div class="content container">
                <section ui-view></section>
            </div>
            <div class="loader-wrap hiding hide">
                <i class="fa fa-circle-o-notch fa-spin"></i>
            </div>
        </div>
`
    });

/* @ngInject */
function meetCtrl($scope) {
    let $ctrl = this;

    this.$onInit = ()=> {
        $scope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState) {
                $ctrl.isLoggedIn = !toState.public;
            }
        });
    };
}