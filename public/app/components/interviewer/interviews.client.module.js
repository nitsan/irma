/**
 * Created by Nitsan Zohar on 24/12/2015.
 */
const requireAll = require('app/components/core/utils/utils.js');

angular.module('interviewers', ["ngTable"]);

requireAll(require.context("./config", true, /js|es6$/));
requireAll(require.context("./components", true, /js|es6$/));