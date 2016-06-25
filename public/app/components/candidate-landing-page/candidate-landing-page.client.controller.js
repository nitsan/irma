/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidate-landing-page')
    .controller('candidateLandingPageController', function(candidateLandingPageService, candidate) {
        this.candidate = candidate;

        this.imHere = function(){
            candidateLandingPageService.imHere(this.candidate);
        }
    });
