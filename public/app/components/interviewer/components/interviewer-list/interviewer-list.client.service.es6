/**
 * Created by nitsa on 11/08/2016.
 */
'use strict';

angular.module('interviewers')
    .factory('interviewersService', interviewersService);

function interviewersService($http) {
    let interviewersPromise = null;
    let interviewers = null;
    let interviewerMap = null;

    let service = {
        getInterviewers: getInterviewers,
        getInterviewerMap: getInterviewerMap,
        saveInterviewer: saveInterviewer,
        deleteInterviewer: deleteInterviewer
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
        return new Promise((resolve) => {
            if (interviewerMap) {
                resolve(interviewerMap);
            } else {
                getInterviewers()
                    .then(() => {
                        resolve(interviewerMap);
                    });
            }
        });
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
}
