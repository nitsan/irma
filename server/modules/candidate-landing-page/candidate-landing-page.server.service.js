/**
 * Created by Nitsan on 22/12/2016.
 */
'use strict';

const co = require('co'),
    logger = require('winston'),
    moment = require('moment');

const candidateService = require('./../candidates/candidate.server.service'),
    userService = require('./../users/user.server.service'),
    interviewerService = require('./../interviewer/interviewer.server.service');

exports.getCandidateLandingData = co.wrap(function*(userId, candidateId) {
    logger.info(`getCandidateLandingData for candidate: ${candidateId} of user: ${userId}`);
    let user = yield userService.getUserById(userId);
    let candidate = yield candidateService.getCandidateById(userId, candidateId);
    let interviewees = yield interviewerService.getInterviewersByIds(userId, candidate.interviewerIds);

    return {
        title: `Hello ${candidate.displayName},`,
        bodyText: `<p>Your interview has been scheduled for ${moment(candidate.date).format("dddd, MMMM Do YYYY, H:mm")} with ${buildIntervieweesString(interviewees)}.</p>
                   <p>We are located at 5 Giboray Israel St. on the 1st floor Netanya- Poleg Industry area.</p>
                   <p>Note that the entrance to the office is on the right side of the building- behind the "Vertigo" furniture store.</p>
                   <p>Please park in one of the nearby parking lots (there is big one next to us). You are welcome to visit our website to learn more about the company and our product: <a href="http://www.startapp.com">www.startapp.com</a>. <a href="https://www.youtube.com/watch?v=mhz6nEui7Zs">https://www.youtube.com/watch?v=mhz6nEui7Zs</a></p> 
                   <p>If you have any questions, please let me know.</p>
                   <p>Please confirm receiving this mail.</p>
                   <p>Good luck,</p>
                   <br>
                   <p>${user.displayName} / ${user.title || 'Recruiter'}</p>
                   <p>M: ${user.phone.mobile || '972.545604111'}  / T: ${user.phone.office || '972.722288372'}</p>`,
        mapLinks: {
            waze: 'http://waze.to/?ll=32.27545,34.86001&navigate=yes',
            googleMap: 'https://www.google.co.il/maps/place/%D7%A9%D7%93%D7%A8%D7%95%D7%AA+%D7%92%D7%99%D7%91%D7%95%D7%A8%D7%99+%D7%99%D7%A9%D7%A8%D7%90%D7%9C+5,+%D7%A0%D7%AA%D7%A0%D7%99%D7%94%E2%80%AD/@32.2754688,34.8621922,17z/data=!3m1!4b1!4m5!3m4!1s0x151d4082c5d4c3'
        }
    };
});

function buildIntervieweesString(interviewers) {
    let intervieweesString = '';
    for (let interviewer of interviewers) {
        intervieweesString = intervieweesString.concat(`${interviewer.title || ''} ${interviewer.displayName} and `);
    }

    intervieweesString = intervieweesString.replace(new RegExp(' and $'), ''); // remove the last ' and'

    return intervieweesString;
}
