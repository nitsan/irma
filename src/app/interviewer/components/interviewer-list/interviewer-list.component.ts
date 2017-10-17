import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'me-interviewer-list',
    templateUrl: './interviewer-list.component.html',
    styleUrls: ['./interviewer-list.component.scss']
})
export class InterviewerListComponent implements OnInit {
    @Input() interviewerList: any[];

    constructor() {
    }

    ngOnInit() {
    }

}
