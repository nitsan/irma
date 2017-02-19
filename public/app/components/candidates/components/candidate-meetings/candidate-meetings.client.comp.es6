/**
 * Created by nitsan on 30/01/2017.
 */
'use strict';
require('./candidate-meetings.scss');

angular
    .module('candidates')
    .component('candidateMeetings', {
        controller: candidateMeetingsCtrl,
        templateUrl: 'app/components/candidates/components/candidate-meetings/candidate-meetings.client.html',
        bindings: {
            candidate: '<'
        }
    });

/* @ngInject */
function candidateMeetingsCtrl(NgTableParams, $state, candidateMeetingsService, interviewersService, toastr) {
    let $ctrl = this;
    // $ctrl.addMeeting = addMeeting;
    $ctrl.editMeeting = editMeeting;
    $ctrl.getInterviewers = getInterviewers;
    $ctrl.deleteMeeting = deleteMeeting;

    $ctrl.$onInit = () => {
        candidateMeetingsService.getMeetings($ctrl.candidate.candidateId)
            .then(meetings => {
                // $ctrl.meetings = meetings;
                $ctrl.meetingsTableParams = createTable(meetings);
            });
    };

    // $ctrl.$onChanges = (changeObj) => {
    //
    // };

    function createTable(meetings) {
        let initialParams = {
            count: 5 // initial page size
        };
        let initialSettings = {
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: meetings
        };

        return new NgTableParams(initialParams, initialSettings);
    }
    //
    // function addMeeting() {
    //     $state.go("meetingEditor", {candidateId: $ctrl.candidate.candidateId});
    // }

    function editMeeting(meetingId) {
        $state.go("meetingEditor", {candidateId: $ctrl.candidate.candidateId, meetingId: meetingId});
    }

    function getInterviewers(interviewersIds) {
        return interviewersService.getInterviewersDisplay(interviewersIds);
    }

    function deleteMeeting(meetingId) {
        candidateMeetingsService.deleteMeeting(meetingId, $ctrl.candidate.candidateId)
            .then(() => {
                toastr.success('Meeting has been deleted', "Delete");
                $ctrl.meetingsTableParams.settings().dataset = _.reject($ctrl.meetingsTableParams.settings().dataset, {meetingId: meetingId});
                $ctrl.meetingsTableParams.reload();
                candidateMeetingsService.removeCandidateMeetingCache($ctrl.candidate.candidateId);
            })
            .catch(response => {
                toastr.error("Cannot delete meeting", "Delete Error");
                console.error("Cannot delete meeting, err: " + response.data.message);
            });
    }
}



