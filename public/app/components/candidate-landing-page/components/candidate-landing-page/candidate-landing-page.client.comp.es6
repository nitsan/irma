/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
'use strict';

angular
    .module('candidate-landing-page')
    .component('candidateLandingPage', {
        controller: candidateLandingPageCtrl,
        templateUrl: 'app/components/candidate-landing-page/components/candidate-landing-page/candidate-landing-page.client.html',
        bindings: {
            landingPageData: '<'
        }
    });

/* @ngInject */
function candidateLandingPageCtrl(candidateLandingPageService, $stateParams) {
    let $ctrl = this;
    $ctrl.imHere = imHere;

    function imHere() {
        candidateLandingPageService.imHere($stateParams.userId, $stateParams.candidateId);
    }
}