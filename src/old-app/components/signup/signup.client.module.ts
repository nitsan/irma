/**
 * Created by Nitsan on 18/01/2017.
 */
import * as angular from 'angular';
import {requireAll} from '../core/utils/utils';

angular.module('signup',[]);

requireAll(require['context']("./config", true, /.*\.(js||ts)$/));
requireAll(require['context']("./components", true, /.*\.(js||ts)$/));