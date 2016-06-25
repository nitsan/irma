/**
 * Created by Nitsan Zohar on 28/10/2015.
 */
angular.module('candidates')
    .factory('candidateListService', function(fireBaseService, $q) {
        var candidateList = [];

        var candidateListService = {
            getCandidates: function(){
                candidateList = fireBaseService.getCandidates();
                return candidateList;
            },
            delete: function(candidate){
                fireBaseService.deleteCandidate(candidate);
            },
            getCandidateById: function(id){
                var defer = $q.defer();

                if (!candidateList.length){
                    console.warn("Candidate list is empty!");
                    this.getCandidates().$loaded().then(function(){
                        defer.resolve(_.find(candidateList, {id: parseInt(id)}));
                    });
                } else {
                    defer.resolve(_.find(candidateList, {id: parseInt(id)}));
                }

                return defer.promise;
            }
        };

        return candidateListService;
    });
