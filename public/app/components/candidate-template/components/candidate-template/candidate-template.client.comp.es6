/**
 * Created by Nitsan on 26/12/2016.
 */
angular
    .module('candidate-template')
    .component('candidateTemplate', {
        controller: candidateTemplateCtrl,
        templateUrl: 'app/components/candidate-template/components/candidate-template/candidate-template.client.html',
        bindings: {
            candidateTemplate: '<',
            candidates: '<',
            user: '<',
            interviewersMap: '<',
            meetings: '<'
        }
    });

/* @ngInject */
function candidateTemplateCtrl(candidateTemplateService, toastr, $uibModal, candidateLandingPageService, candidateMeetingsService) {
    let $ctrl = this;
    $ctrl.buildMessagePreview = buildMessagePreview;
    $ctrl.buildSmsPreview = buildSmsPreview;
    $ctrl.updatePreviews = updatePreviews;
    $ctrl.saveCandidate = saveCandidate;
    $ctrl.revertTemplate = revertTemplate;
    $ctrl.openPreviewModal = openPreviewModal;
    $ctrl.onCandidateChange = onCandidateChange;

    this.$onInit = () => {
        $ctrl.templateCopy = angular.copy($ctrl.candidateTemplate);
        $ctrl.candidate = $ctrl.candidates[0];
        $ctrl.meeting = $ctrl.meetings[0];
    };

    function buildMessagePreview() {
        $ctrl.messagePreview = candidateTemplateService.buildPreview($ctrl.candidateTemplate.template.message, $ctrl.user, $ctrl.candidate, $ctrl.meeting, $ctrl.candidateTemplate, $ctrl.interviewersMap);
    }

    function buildSmsPreview() {
        $ctrl.smsPreview = candidateTemplateService.buildPreview($ctrl.candidateTemplate.template.sms, $ctrl.user, $ctrl.candidate, $ctrl.meeting, $ctrl.candidateTemplate, $ctrl.interviewersMap);
    }

    function updatePreviews() {
        buildSmsPreview();
        buildMessagePreview();
    }

    function saveCandidate() {
        candidateTemplateService.saveTemplate($ctrl.candidateTemplate)
            .then(candidateTemplate => {
                toastr.success(`Candidate template was save successfully`, "Save");
                $ctrl.candidateTemplate = candidateTemplate;
            })
            .catch(err => {
                console.error("Cannot save template, err: " + err.message);
                toastr.error("Cannot save template", "Save Error");
            });
    }

    function revertTemplate() {
        $ctrl.candidateTemplate = angular.copy($ctrl.templateCopy);
    }

    function openPreviewModal() {
        return $uibModal.open({
            component: 'templateModalComponent',
            resolve: {
                landingPageData: function () {
                    return candidateLandingPageService.getCandidateLandingPageData($ctrl.user.userId, $ctrl.candidate.candidateId);
                }
            }
        });
    }

    function onCandidateChange() {
        candidateMeetingsService.getMeetings($ctrl.candidate.candidateId)
            .then(meetings => {
                $ctrl.meetings = meetings;
                $ctrl.meeting = meetings.length ? meetings[0] : {date: new Date()};
                updatePreviews();
            });
    }
}