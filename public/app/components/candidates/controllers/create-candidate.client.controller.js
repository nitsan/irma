/**
 * Created by Nitsan Zohar on 28/10/2015.
 */

angular.module('candidates')
    .controller('createCandidateController', function (fireBaseService, $state, candidate, createCandidateService, toastr) {
        this.isNew = !candidate;
        var required = ['firstName', 'lastName', 'phone', 'email', 'interviewer', 'date'];
        this.candidate = candidate;
        this.interviewers = fireBaseService.getInterviewers();


        this.validateForm = function () {
            var validObj = {valid: true};
            for (var i = 0; i < required.length; i++) {
                if (!this.candidate[required[i]]) {
                    validObj = {field: required[i], valid: false};
                    break;
                }
            }

            if (validObj.valid) {
                this.saveCandidate();
                $state.go("candidateList");
            } else {
                console.warn("Not valid field: " + validObj.field);
                toastr.warning("Candidate is not valid", 'Validation');
            }
        };

        this.saveCandidate = function () {
            if (this.isNew) {
                createCandidateService.createCandidate(this.candidate)
                    .then(function (candidate) {
                        toastr.success('Candidate "' + candidate.firstName + ' ' + candidate.lastName + '" was save successfully', "Save");
                        createCandidateService.initCandidate();
                    })
                    .catch(function (err) {
                        console.error("Cannot create user, err: " + err.message);
                        toastr.error("Cannot create user", "Save Error")
                    });
            } else {
                createCandidateService.updateCandidate(this.candidate)
                    .then(function (candidate) {
                        toastr.success('Candidate "' + candidate.firstName + ' ' + candidate.lastName + '" was update successfully', "Save");
                        createCandidateService.initCandidate();
                    })
                    .catch(function (err) {
                        console.error("Cannot update user, err: " + err.message);
                        toastr.error("Cannot update user", "Save Error")
                    });
            }
        };

        this.cancel = function () {
            $state.go("candidateList");
            createCandidateService.initCandidate();
        }
    });