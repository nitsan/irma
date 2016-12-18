/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('calendar', [])
    .config(function ($stateProvider) {

        $stateProvider
            .state('calendarPage', {
                url: '/calendar',
                templateUrl: 'app/components/calendar/calendar.client.html'
            });
    });