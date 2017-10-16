/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .factory('candidateEditorService', candidateEditorService);

/* @ngInject */
function candidateEditorService($http) {
    var candidateEditorService = {
        getCandidate: function (candidateId) {
            return $http.get(`/api/candidate/${candidateId}`)
                .then(function (response) {
                    return response.data;
                });
        },
        saveCandidate: function (candidate) {
            return candidate.candidateId ? this.updateCandidate(candidate) : this.createCandidate(candidate)
        },
        createCandidate: function (candidate) {
            return $http.post('/api/candidate', {candidate: candidate})
                .then(function (response) {
                    return response.data;
                });
        },
        updateCandidate: function (candidate) {
            return $http.put('/api/candidate', {candidate: candidate})
                .then(function (response) {
                    return response.data;
                });
        }
    };

    return candidateEditorService;
}
