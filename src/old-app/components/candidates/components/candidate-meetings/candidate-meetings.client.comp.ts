/**
 * Created by nitsan on 30/01/2017.
 */
import * as angular from 'angular';
import * as _ from 'lodash';

require('./candidate-meetings.scss');

const template = require('./candidate-meetings.client.html');

angular
    .module('candidates')
    .component('candidateMeetings', {
        controller: candidateMeetingsCtrl,
        template: template,
        bindings: {
            candidate: '<'
        }
    });

candidateMeetingsCtrl.$inject = ['NgTableParams', '$state', 'candidateMeetingsService', 'interviewersService', 'toastr',
    'yesNoModalService', 'smsService'];

function candidateMeetingsCtrl(NgTableParams, $state, candidateMeetingsService, interviewersService, toastr,
                               yesNoModalService, smsService) {
    const $ctrl = this;
    // $ctrl.addMeeting = addMeeting;
    $ctrl.editMeeting = editMeeting;
    $ctrl.getInterviewers = getInterviewers;
    $ctrl.deleteMeeting = deleteMeeting;
    $ctrl.sendSMS = sendSMS;

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
        const initialParams = {
            count: 5 // initial page size
        };
        const initialSettings = {
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: meetings
        };

        return new NgTableParams(initialParams, initialSettings);
    }

    function editMeeting(meetingId) {
        $state.go("meetingEditor", {candidateId: $ctrl.candidate.candidateId, meetingId: meetingId});
    }

    function getInterviewers(interviewersIds) {
        return interviewersService.getInterviewersDisplay(interviewersIds);
    }

    function deleteMeeting(meetingId) {
        const modalInstance = yesNoModalService.createModal('Confirm Delete', "Are you sure you want to delete this meeting?");

        modalInstance.result
            .then(approve => {
                if (approve) {
                    candidateMeetingsService.deleteMeeting(meetingId, $ctrl.candidate.candidateId)
                        .then(() => {
                            toastr.success('Meeting has been deleted', "Delete");
                            $ctrl.meetingsTableParams.settings().dataset =
                                _.reject($ctrl.meetingsTableParams.settings().dataset, {meetingId: meetingId});
                            $ctrl.meetingsTableParams.reload();
                            candidateMeetingsService.removeCandidateMeetingCache($ctrl.candidate.candidateId);
                        })
                        .catch(response => {
                            toastr.error("Cannot delete meeting", "Delete Error");
                            console.error("Cannot delete meeting, err: " + response.data.message);
                        });
                }
            });
    }

    function sendSMS(meetingId) {
        const modalSms = yesNoModalService.createModal(
            'Confirm SMS', `Are you sure you want to send SMS ${$ctrl.candidate.firstName} ${$ctrl.candidate.lastName}?`);

        modalSms.result
            .then(approve => {
                if (approve) {
                    smsService.sendSMS(meetingId)
                        .then(() => {
                            toastr.success(`SMS was sent to candidate ${$ctrl.candidate.firstName} ${$ctrl.candidate.lastName}`, "SMS");
                        });
                }
            });
    }
}



