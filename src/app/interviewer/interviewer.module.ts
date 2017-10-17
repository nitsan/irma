import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterviewerListComponent} from "./components/interviewer-list/interviewer-list.component";
import '../interviewer/components/interviewer-list/interviewer-list.downgrade';
import {InterviewersTableDirective} from "../../old-app/components/interviewer/components/interviewers-table/interviewers-table.upgrade";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InterviewerListComponent,
        InterviewersTableDirective
    ],
    entryComponents: [
        InterviewerListComponent
    ]
})
export class InterviewerModule {
}
