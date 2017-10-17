/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

const template = require('./calendar.client.html');

calendarConfig.$inject = ['$stateProvider'];

function calendarConfig($stateProvider) {

    $stateProvider
        .state('calendarPage', {
            url: '/calendar',
            template: template
        });
}

angular.module('calendar', [])
    .config(calendarConfig);
