/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .factory('candidateListService', function ($http, $uibModal) {
        var candidateList = [];
        var candidatesPromise = null;

        var candidateListService = {
            getCandidates: function (withCache) {
                if (!candidatesPromise || !withCache) {
                    candidatesPromise = $http.get('/api/candidate')
                        .then(function (response) {
                            angular.copy(response.data, candidateList);
                            return candidateList;
                        });
                }

                return candidatesPromise;
            },
            delete: function (candidate) {
                return $http.delete('/api/candidate/' + candidate.candidateId)
                    .then(() => {
                        candidatesPromise = null;
                        return candidateListService.getCandidates();
                    });
            },
            getCandidateById: function (candidateId) {
                return new Promise((resolve) => {
                    if (candidateList.length) {
                        resolve(this.findCandidate(candidateId));
                    } else {
                        candidatesPromise = $http.get(`/api/candidate/${candidateId}`)
                            .then(response => {
                                resolve(response.data);
                            });
                    }
                });
            },
            findCandidate: function (candidateId) {
                let candidate =  _.find(candidateList, {candidateId: candidateId});
                if (candidate && candidate.date) {
                    candidate.date = new Date(candidate.date);
                }

                return candidate;
            },
            createModal: function (title, bodyText) {
                return $uibModal.open({
                    component: 'modalComponent',
                    resolve: {
                        title: function () {
                            return title;
                        },
                        bodyText: function () {
                            return bodyText;
                        }
                    }
                });
            }
        };

        return candidateListService;
    });
