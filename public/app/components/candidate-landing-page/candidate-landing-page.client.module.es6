const requireAll = require('app/components/core/utils/utils.js');

angular.module('candidate-landing-page', ['interviewers']);

requireAll(require.context("./config", true, /js|es6$/));
requireAll(require.context("./components", true, /js|es6$/));
