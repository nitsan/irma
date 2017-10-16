import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UpgradeModule} from "@angular/upgrade/static";
import * as angular from 'angular';
import {setAngularLib} from '@angular/upgrade/static';
import '../old-app/main';
import '../old-app/app';


@NgModule({
    declarations: [
        AppComponent,
        // MeetDirective
    ],
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    providers: [],
    // bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private upgrade: UpgradeModule) {
        // setAngularLib(angular);
    }

    ngDoBootstrap() {
        // this.upgrade.bootstrap(document.body, ['meet'], {strictDi: true});
    }
}
