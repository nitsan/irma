import * as angular from 'angular';
import {InterviewerListComponent} from './interviewer-list.component';
import {downgradeComponent} from '@angular/upgrade/static';

angular.module('interviewers')
    .directive(
        'meInterviewerList',
        downgradeComponent({component: InterviewerListComponent}) as angular.IDirectiveFactory
    );
