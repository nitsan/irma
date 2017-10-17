/**
 * Created by Nitsan on 19/12/2016.
 */
import * as angular from 'angular';

const template = require('./interviewer-list.client.html');

angular
    .module('interviewers')
    .component('interviewerList', {
        template: template,
        bindings: {
            interviewerList: '<'
        }
    });