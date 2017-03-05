/**
 * Created by Nitsan on 01/01/2017.
 */
angular.module('candidate-template')
    .constant("candidateTemplateSettings", {
        templateMap: {
            '{{companyName}}': 'candidateTemplate.info.companyName',
            '{{candidate.displayName}}': 'candidate.displayName',
            '{{meeting.date}}': 'moment(meeting.date).format("dddd, MMMM Do YYYY, H:mm")',
            '{{interviewers}}': 'buildIntervieweesString(meeting.interviewers, interviewersMap)',
            '{{companyAddress}}': 'candidateTemplate.address.address',
            '{{user.displayName}}': 'user.displayName',
            '{{user.title}}': 'user.title',
            '{{user.mobilePhone}}': 'user.phone.mobile',
            '{{user.officePhone}}': 'user.phone.office',
            '{{link}}': 'function getLink(){return "<-the link will be here->"};getLink()'
        }
    });