/**
 * Created by Nitsan on 19/12/2016.
 */
'use strict';

angular
    .module('interviewers')
    .component('interviewerList', {
        templateUrl: 'app/components/interviewer/components/interviewer-list/interviewer-list.client.html',
        bindings: {
            interviewerList: '<'
        }
    });