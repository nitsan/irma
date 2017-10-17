import * as angular from 'angular';
import * as _ from 'lodash';
// const moment = require('moment'); // need it to eval(replacement)

angular.module('candidate-template')
    .factory('candidateTemplateService', candidateTemplateService);

candidateTemplateService.$inject = ['$http', 'candidateTemplateSettings'];

function candidateTemplateService($http, candidateTemplateSettings) {

    let service = {
        getCandidateTemplate: getCandidateTemplate,
        saveTemplate: saveTemplate,
        buildPreview: buildPreview
    };

    return service;

    function getCandidateTemplate() {
        return $http.get('/api/candidate-template')
            .then(response => {
                return response.data;
            })
    }

    function saveTemplate(candidateTemplate) {
        return $http.put('/api/candidate-template', candidateTemplate)
            .then(response => {
                return response.data;
            });
    }

    // need 'candidate, user, interviewersMap' for eval
    function buildPreview(template, user, candidate, meeting, candidateTemplate, interviewersMap) {
        let previewText = template;
        _.forEach(candidateTemplateSettings.templateMap, (replacement, placeHolder) => {
            try {
                if (previewText.includes(placeHolder)) {
                    const evalValue = eval(replacement) || '';
                    previewText = previewText.replace(placeHolder, evalValue);
                }
            } catch (err) {
                console.warn(`Cannot replace ${placeHolder} to ${replacement}, error: ${err}`);
            }
        });

        return previewText;
    }

    function buildIntervieweesString(intervieweesIds, interviewersMap) {
        let intervieweesString = '';
        for (const interviewerId of intervieweesIds) {
            const interviewer = interviewersMap[interviewerId] || {};
            intervieweesString = intervieweesString.concat(`${interviewer.title || ''} ${interviewer.displayName} and `);
        }

        intervieweesString = intervieweesString.replace(new RegExp(' and $'), ''); // remove the last ' and'

        return intervieweesString;
    }
}