/**
 * Created by Nitsan Zohar on 24/12/2015.
 */
import * as angular from 'angular';
import {requireAll} from '../core/utils/utils';

angular.module('interviewers', ["ngTable"]);

requireAll(require['context']("./config", true, /js|ts/));
requireAll(require['context']("./components", true, /js|ts/));