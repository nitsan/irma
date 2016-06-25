/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('calendar',[]).config(function ($stateProvider) {

    $stateProvider
        .state('calendarPage', {
            url: '/calendar',
            views: {
                'main': {
                    templateUrl: 'app/components/calendar/calendar.client.html'
                },
                'sidebar':{
                    templateUrl: 'app/components/sidebar/sidebar.client.html'
                },
                'navbar':{
                    templateUrl: 'app/components/navbar/navbar.client.html'
                }
            }
        });

    //$state.go('candidateList');
});