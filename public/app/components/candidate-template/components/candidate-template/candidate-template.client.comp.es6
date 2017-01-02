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
            intervieweesMap: '<'
        }
    });

/* @ngInject */
function candidateTemplateCtrl(candidateTemplateService, toastr, $uibModal, candidateLandingPageService) {
    let $ctrl = this;
    $ctrl.buildPreview = buildPreview;
    $ctrl.onCandidateChange = onCandidateChange;
    $ctrl.saveCandidate = saveCandidate;
    $ctrl.revertTemplate = revertTemplate;
    $ctrl.openPreviewModal = openPreviewModal;

    this.$onInit = () => {
        $ctrl.templateCopy = angular.copy($ctrl.candidateTemplate);
        $ctrl.candidate = $ctrl.candidates[0];
    };

    function buildPreview() {
        $ctrl.templatePreview = candidateTemplateService.buildPreview($ctrl.candidateTemplate.template, $ctrl.candidate, $ctrl.user, $ctrl.candidateTemplate, $ctrl.intervieweesMap);
    }

    function onCandidateChange() {
        buildPreview();
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
}