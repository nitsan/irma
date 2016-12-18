/**
 * Created by Nitsan Zohar on 29/10/2015.
 */
angular.module('candidates')
    .constant("candidateSettings", {
        requiredFields: ['firstName', 'lastName', 'phone', 'email', 'interviewer', 'date'],
        candidateModel: {
            firstName: null,
            lastName: null,
            candidatePhone: null,
            candidateEmail: null,
            interviewerName: null,
            team: null,
            date: null
        }
    });
