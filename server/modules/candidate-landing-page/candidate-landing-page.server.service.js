/**
 * Created by Nitsan on 22/12/2016.
 */
'use strict';

const co = require('co'),
    logger = require('winston'),
    _ = require('lodash'),
    moment = require('moment');

const candidateService = require('./../candidates/candidate.server.service'),
    userService = require('./../users/user.server.service'),
    interviewerService = require('./../interviewer/interviewer.server.service'),
    CandidateTemplateModel = require('./candidate-template.server.model'),
    candidateLandingPageConfig = require('./candidate-landing-page.server.config');


exports.getCandidateLandingData = co.wrap(function*(userId, candidateId) {
    logger.info(`getCandidateLandingData for candidate: ${candidateId} of user: ${userId}`);
    let candidateTemplate;
    try {
        candidateTemplate = yield CandidateTemplateModel.findOne({userId: userId});
    } catch (err) {
        logger.error(`Cannot get candidate template for user: ${userId}, err: ${err}`);
        yield Promise.reject(err);
    }

    candidateTemplate.template = yield fillTemplate(userId, candidateId, candidateTemplate);
    buildAddresses(candidateTemplate);

    return candidateTemplate;
});

const fillTemplate = co.wrap(function*(userId, candidateId, candidateTemplate) {
    let candidate = yield candidateService.getCandidateById(userId, candidateId);
    let user = yield userService.getUserById(userId);
    let interviewees = yield interviewerService.getInterviewersByIds(userId, candidate.interviewerIds);

    return buildTemplate(candidateTemplate.template, candidate, user, candidateTemplate, interviewees);
});

// call candidate, user, candidateTemplate, interviewees for eval
function buildTemplate(template, candidate, user, candidateTemplate, interviewees) {
    let previewText = template;

    _.forEach(candidateLandingPageConfig.TEMPLATE_MAP, (replacement, placeHolder) => {
        try {
            previewText = previewText.replace(placeHolder, eval(replacement) || '');
        } catch (err) {
            logger.warn(`Cannot replace ${placeHolder} to ${replacement}, error: ${err}`);
        }
    });

    return previewText;
}

function buildAddresses(candidateTemplate) {
    let wazeAdrees = _.get(candidateTemplate, 'address.waze');
    if (wazeAdrees) {
        //wazeAdrees e.g., https://www.waze.com/livemap?zoom=17&lat=32.27547&lon=34.86001
        let wazeLat = '';
        const latArr = wazeAdrees.match(/lat=(.*)&/);
        if (latArr.length > 0) {
            wazeLat = latArr[1];
        }

        const lonArr = wazeAdrees.match(/lon=(.*)/);
        if (lonArr.length > 0) {
            wazeLat += lonArr[1]
        }

        candidateTemplate.address.waze = `http://waze.to/?ll=${wazeLat}&navigate=yes`;
    }
}

// call this from buildTemplate eval
function buildIntervieweesString(interviewees) {
    let intervieweesString = '';
    for (let interviewer of interviewees) {
        intervieweesString = intervieweesString.concat(`${interviewer.title || ''} ${interviewer.displayName} and `);
    }

    intervieweesString = intervieweesString.replace(new RegExp(' and $'), ''); // remove the last ' and'

    return intervieweesString;
}

exports.getCandidateTemplate = co.wrap(function*(userId) {
    let candidateTemplate;
    try {
        candidateTemplate = yield CandidateTemplateModel.findOne({userId: userId});
        if (!candidateTemplate) {
            candidateTemplate = new CandidateTemplateModel();
        }
    } catch (err) {
        logger.error(`Cannot get candidate template for user: ${userId}, err: ${err}`);
        yield Promise.reject(err);
    }

    return candidateTemplate;
});

exports.saveCandidateTemplate = function saveInterviewer(userId, candidateTemplate) {
    return candidateTemplate.userId ? updateCandidateTemplate(userId, candidateTemplate) : createCandidateTemplate(userId, candidateTemplate);
};

const createCandidateTemplate = co.wrap(function*(userId, candidateTemplate) {
    candidateTemplate.userId = userId;
    let candidateTemplateObj = new CandidateTemplateModel(candidateTemplate);

    try {
        yield candidateTemplateObj.save();
    } catch (err) {
        logger.error("Cannot save candidate template, err" + err);
        yield Promise.reject(err);
    }

    return candidateTemplate;
});

const updateCandidateTemplate = co.wrap(function*(userId, candidateTemplate) {
    candidateTemplate.userId = userId;
    candidateTemplate.updateDate = new Date().getTime();

    try {
        yield CandidateTemplateModel.findOneAndUpdate({userId: userId}, candidateTemplate);
    } catch (err) {
        logger.error("Cannot update candidate template, err" + err);
        yield Promise.reject(err);
    }

    return candidateTemplate;
});