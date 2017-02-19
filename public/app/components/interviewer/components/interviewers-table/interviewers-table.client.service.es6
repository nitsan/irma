/**
 * Created by nitsa on 11/08/2016.
 */
'use strict';

angular.module('interviewers')
    .factory('interviewersService', interviewersService);

/* @ngInject */
function interviewersService($http, $q) {
    let interviewersPromise = null;
    let interviewers = null;
    let interviewerMap = null;

    let service = {
        getInterviewers: getInterviewers,
        getInterviewerMap: getInterviewerMap,
        saveInterviewer: saveInterviewer,
        deleteInterviewer: deleteInterviewer,
        getInterviewersDisplay: getInterviewersDisplay
    };

    return service;


    function resetClientCache() {
        interviewersPromise = null;
        interviewerMap = null;
    }

    function getInterviewers(withCache) {
        if (!interviewersPromise || !withCache) {
            interviewersPromise = $http.get(`/api/interviewer`)
                .then(function (response) {
                    interviewers = response.data;
                    interviewerMap = _.keyBy(interviewers, 'interviewerId');
                    return interviewers;
                });
        }

        return interviewersPromise;
    }

    function getInterviewerMap() {
        let deferred = $q.defer();

        if (interviewerMap) {
            deferred.resolve(interviewerMap);
        } else {
            getInterviewers()
                .then(() => {
                    deferred.resolve(interviewerMap);
                });
        }

        return deferred.promise;
    }

    function saveInterviewer(interviewer) {
        if (interviewer.$isEditing) delete interviewer.$isEditing;
        return $http.post('/api/interviewer', {interviewer: interviewer})
            .then(response => {
                resetClientCache();
                return response.data;
            });
    }

    function deleteInterviewer(interviewer) {
        return $http.delete('/api/interviewer/' + interviewer.interviewerId)
            .then(() => {
                resetClientCache();
                return;
            });
    }

    function getInterviewersDisplay(interviewerIds) {
        let interviewers = [];
        if (interviewerIds){
            for (let interviewerId of interviewerIds) {
                let interviewer = interviewerMap[interviewerId];
                if (interviewer) {
                    interviewers.push(interviewer.displayName);
                }
            }
        }

        return interviewers.toString();
    }
}
