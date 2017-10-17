import {Directive, ElementRef, Injector, Input} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
    selector: 'interviewers-table'
})
export class InterviewersTableDirective extends UpgradeComponent {
    @Input() interviewerList: any[];

    constructor(elementRef: ElementRef, injector: Injector) {
        super('interviewersTable', elementRef, injector);
    }
}
