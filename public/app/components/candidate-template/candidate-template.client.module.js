/**
 * Created by nitsan on 14/09/2016.
 */
const requireAll = require('app/components/core/utils/utils.js');

angular.module('candidate-template', ['textAngular', 'candidates', 'interviewers', 'candidate-landing-page']);

requireAll(require.context("./config", true, /js|es6$/));
requireAll(require.context("./components", true, /js|es6$/));