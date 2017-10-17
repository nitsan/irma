/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
import * as angular from 'angular';

const template = require('./candidate-landing-page.client.html');

angular
    .module('candidate-landing-page')
    .component('candidateLandingPage', {
        controller: candidateLandingPageCtrl,
        template: template,
        bindings: {
            landingPageData: '<'
        }
    });

candidateLandingPageCtrl.$inject = ["candidateLandingPageService", "$stateParams"];

function candidateLandingPageCtrl(candidateLandingPageService, $stateParams) {
    let $ctrl = this;
    $ctrl.imHere = imHere;

    function imHere() {
        candidateLandingPageService.imHere($stateParams.userId, $stateParams.candidateId);
    }
}