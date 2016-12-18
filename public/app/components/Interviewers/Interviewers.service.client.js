/**
 * Created by nitsa on 11/08/2016.
 */
angular.module('interviewers')
    .factory('interviewersService', interviewersService);

function interviewersService($http, $q, userService) {
    var interviewersPromise = null;
    var interviewers = null;

    var service = {
        getInterviewers:getInterviewers,
        getInterviewerByName: getInterviewerByName
    };

    return service;


    function getInterviewers() {
        if (!interviewersPromise){
            var groupId = userService.getCurrentUser().groupId;
            interviewersPromise = $http.get(`/group/:${groupId}/interviewer`)
                .then(function(response){
                    interviewers = response.data;
                   return interviewers;
                });
        }

        return interviewersPromise;
    }

    function getInterviewerByName(interviewerByName) {
        if (!interviewers){
            return getInterviewers()
                .then(function(interviewers){
                    
                })
        } else {
            var interviewer = _.find(interviewers, {interviewerName: intervieweName});
            return $q.when(interviewer);
        }
    }
}
