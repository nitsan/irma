//
angular.module('candidates')
    .factory('candidateMeetingEditorService', candidateMeetingEditorService);

candidateMeetingEditorService.$inject = ['$http'];

function candidateMeetingEditorService($http) {
    let meetingsMap = {};

    let service = {
        saveMeeting: saveMeeting
    };

    return service;

    function saveMeeting(meeting) {
        return $http.post(`/api/candidate/${meeting.candidateId}/meeting`, meeting)
            .then(response => {
                return response.data
            });
    }
}