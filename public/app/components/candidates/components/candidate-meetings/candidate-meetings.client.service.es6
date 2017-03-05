angular.module('candidates')
    .factory('candidateMeetingsService', candidateMeetingsService);

/* @ngInject */
function candidateMeetingsService($http, $q) {
    let meetingsMap = {};

    let service = {
        getMeetings: getMeetings,
        removeCandidateMeetingCache: removeCandidateMeetingCache,
        getMeetingById: getMeetingById,
        deleteMeeting: deleteMeeting
    };

    return service;

    function getMeetings(candidateId) {
        let st = new Date().getTime();
        let deferred = $q.defer();

        if (meetingsMap[candidateId]) {
            deferred.resolve(meetingsMap[candidateId]);
            // console.log("total cache time: " + (new Date().getTime() - st));
        } else {
            $http.get(`/api/candidate/${candidateId}/meeting`)
                .then(response => {
                    meetingsMap[candidateId] = response.data;
                    deferred.resolve(meetingsMap[candidateId]);
                    // console.log("total time: " + (new Date().getTime() - st));
                })
                .catch(response => {
                    let err = response.data;
                    console.error(err);
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

    function removeCandidateMeetingCache(candidateId) {
        delete meetingsMap[candidateId];
    }

    function getMeetingById(meetingId, candidateId) {
        let deferred = $q.defer();

        if (!meetingId) {
            deferred.resolve({candidateId: candidateId});
        } else {
            getMeetings(candidateId)
                .then(() => {
                let candidateMeetings = meetingsMap[candidateId];
                    if (candidateMeetings) {
                        let meeting = _.find(candidateMeetings, {meetingId: meetingId});
                        deferred.resolve(meeting);
                    } else {
                        deferred.reject(new Error(`Cannot find meeting: ${meetingId}`));
                    }
                });
        }

        return deferred.promise;
    }

    function deleteMeeting(meetingId, candidateId) {
        return $http.delete(`/api/candidate/${candidateId}/meeting/${meetingId}`);
    }
}