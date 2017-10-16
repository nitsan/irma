/**
 * Created by nitsan on 30/01/2017.
 */
import * as angular from 'angular';
// require('./candidate-table.scss');

angular
    .module('candidates')
    .component('meetingEditor', {
        controller: meetingEditorCtrl,
        templateUrl: './meeting-editor.client.html',
        bindings: {
            meeting: '<',
            interviewers: '<'
        }
    });

meetingEditorCtrl.$inject= ['candidateMeetingEditorService', 'toastr', '$state', 'candidateMeetingsService'];

function meetingEditorCtrl(candidateMeetingEditorService, toastr, $state, candidateMeetingsService) {
    let $ctrl = this;
    $ctrl.saveMeeting = saveMeeting;
    $ctrl.cancel = cancel;

    $ctrl.$onInit = () => {
        $ctrl.copyMeeting = angular.copy($ctrl.meeting);
        if ($ctrl.meeting && $ctrl.meeting.date){
            $ctrl.meeting.date = new Date($ctrl.meeting.date);
        }
    };

    // $ctrl.$onChanges = (changeObj) => {
    //
    // };

    function saveMeeting() {
        candidateMeetingEditorService.saveMeeting($ctrl.meeting)
            .then(meeting => {
                toastr.success(`Meeting was save successfully`, "Save");
                candidateMeetingsService.removeCandidateMeetingCache($ctrl.meeting.candidateId);
                goBack();
            })
            .catch(response => {
                toastr.error("Cannot save meeting", "Save Error");
                console.error("Cannot create user, err: " + response.data.message);
            });
    }
    
    function cancel() {
        angular.copy($ctrl.copyMeeting, $ctrl.meeting);
        goBack();
    }
    
    function goBack() {
        $state.go("candidateList");
    }
}


