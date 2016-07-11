/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .factory('candidateListService', function ($http, $q) {
        var candidateList = [];
        var userId = "1000";

        var candidateListService = {
            getCandidates: function () {
                return $http.get('/api/uid/' + userId + '/candidate')
                    .then(function (response) {
                        angular.copy(response.data, candidateList);
                        return candidateList;
                    })
                    .catch(function (err) {
                        return err;
                    });
            },
            delete: function (candidate) {
                return $http.delete('/api/uid/' + userId + '/candidate/' + candidate.id)
                    .then(candidateListService.getCandidates);
            },
            getCandidateById: function (id) {
                var defer = $q.defer();

                if (!candidateList.length) {
                    this.getCandidates()
                        .then(function () {
                            defer.resolve(candidateListService.findCandidate(id));
                        });
                } else {
                    defer.resolve(candidateListService.findCandidate(id));
                }

                return defer.promise;
            },
            findCandidate: function (id) {
                var candidate = _.find(candidateList, {id: id});
                if (candidate && candidate.date){
                    candidate.date = new Date(candidate.date);
                }

                return candidate;
            }
        };

        return candidateListService;
    });
