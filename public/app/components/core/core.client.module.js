/**
 * Created by nitsa on 10/11/2016.
 */
const requireAll = require('app/components/core/utils/utils.js');

angular.module('core', ['user', 'ngAnimate', 'toastr', 'ngSanitize']);

requireAll(require.context("./components", true, /js|es6$/));