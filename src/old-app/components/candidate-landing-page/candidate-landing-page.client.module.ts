import * as angular from 'angular';
import {requireAll} from '../core/utils/utils';

angular.module('candidate-landing-page', ['interviewers']);

requireAll(require['context']("./config", true, /js|ts/));
requireAll(require['context']("./components", true, /js|ts/));
