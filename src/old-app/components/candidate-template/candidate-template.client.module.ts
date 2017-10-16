/**
 * Created by nitsan on 14/09/2016.
 */
import * as angular from 'angular';
import {requireAll} from '../core/utils/utils';

angular.module('candidate-template', ['textAngular', 'candidates', 'interviewers', 'candidate-landing-page']);

requireAll(require['context']("./config", true, /js|ts/));
requireAll(require['context']("./components", true, /js|ts/));