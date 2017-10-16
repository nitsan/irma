/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

calendarConfig.$inject = ['$stateProvider'];

function calendarConfig($stateProvider) {

    $stateProvider
        .state('calendarPage', {
            url: '/calendar',
            templateUrl: './calendar.client.html'
        });
}

angular.module('calendar', [])
    .config(calendarConfig);