/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

//myDataRef.set({name: name, text: text});
//myDataRef.push({name: name, text: text});
//myDataRef.on('child_added', function(snapshot) {
//    //We'll fill this in later.
//    var message = snapshot.val();
//    displayChatMessage(message.name, message.text);
//});

angular.module('meetFireBase')
    .factory('fireBaseService', function (fireBaseConfig, $firebaseAuth, $log, $q, $firebaseObject, $firebaseArray) {
        var baseUrl = fireBaseConfig.baseUrl;
        //var ref = new Firebase("https://meet-irma.firebaseio.com");
        //var data = $firebaseObject(ref);
        var candidatesDataRef = new Firebase(baseUrl + '/candidates');
        //var usersDataRef = new Firebase(baseUrl + 'users');
        var interviewersDataRef = new Firebase(baseUrl + '/interviewers');
        //var candidatesObj = null;
        var candidates = [];
        var interviewers = null;

        //interviewersDataRef.on('value', function(snapshot) {
        //    interviewers = snapshot.val();
        //candidatesObj = snapshot.val();
        //if (candidatesObj) {
        //    candidates = $.map(candidatesObj, function (value, index) {
        //        return [value];
        //    });
        //
        //    //angular.copy(tempCandidates, candidates);
        //} else {
        //    //angular.copy([], candidates);
        //    candidates = [];
        //}
        //});

        var fireBaseService = {
            // Candidate Functions
            //addCandidate: function(candidate){
            //    if (candidate){
            //        candidate.date = candidate.date.getTime();
            //        candidate.id = Firebase.ServerValue.TIMESTAMP;
            //        //candidatesDataRef.push(candidate);
            //        //this.getCandidates();
            //        if (!candidates){
            //            this.getCandidates();
            //        }
            //        candidates.$add(candidate);
            //    } else {
            //        $log.warn("Cannot add candidate: " + candidate);
            //    }
            //},
            saveCandidate: function (candidate) {
                candidate.date = candidate.date.toString(); // firebase cannot save Date object
                if (candidate.id) {
                    return candidates.$save(candidate);
                } else {
                    candidate.id = Firebase.ServerValue.TIMESTAMP;
                    return candidates.$add(candidate);
                }
            },
            //getCandidatesOld: function(){
            //    var defer = $q.defer();
            //    candidatesDataRef.on('value', function(snapshot) {
            //        candidatesObj = snapshot.val();
            //        if (candidatesObj) {
            //            var tempCandidates = $.map(candidatesObj, function (value, index) {
            //                return [value];
            //            });
            //
            //            angular.copy(tempCandidates, candidates);
            //        } else {
            //            angular.copy([], candidates);
            //        }
            //
            //        angular.forEach(candidates, function(value, key) {
            //            value.date = new Date(value.date);
            //        });
            //
            //        defer.resolve(candidates);
            //    });
            //
            //    return defer.promise;
            //    //return candidates;
            //},
            getCandidates: function () {
                candidates = $firebaseArray(candidatesDataRef);
                candidates.$loaded().then(function () {
                    angular.forEach(candidates, function (candidate, key) {
                        if (candidate.date) {
                            candidate.date = new Date(candidate.date);
                        }
                    });
                });
                return candidates;
            },
            deleteCandidate: function (candidate) {
                candidates.$remove(candidate);
                //var keyToDelete = _.findKey(candidatesObj, {'id': id});
                //if (keyToDelete) {
                //    var candidateDataRef = new Firebase(baseUrl + 'candidates/' + keyToDelete);
                //    if (candidateDataRef) {
                //        $log.info("delete candidate id : " + id);
                //        candidateDataRef.remove();
                //        this.getCandidates();
                //    }
                //} else {
                //    $log.warn("Cannot find keyToDelete");
                //}
            },
            getCandidateById: function (id) {
                //var defer = $q.defer();
                //this.getCandidates().then(function(candidates){
                //    defer.resolve(_.find(candidates, {id: Number(id)}));
                //});
                //
                //return defer.promise;

                return _.find(candidates, {id: Number(id)});
            },
            // Interviewers Functions
            getInterviewers: function () {
                return $firebaseArray(interviewersDataRef);
            }
        };

        return fireBaseService;
    });