/**
 * Created by nitsa on 10/11/2016.
 */
import * as angular from 'angular';
import {requireAll} from '../core/utils/utils';
// const requireAll = require('./utils/utils.ts');

angular.module('core', ['user', 'ngAnimate', 'toastr', 'ngSanitize']);

requireAll(require['context']("./components", true, /js|ts$/));