import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseAdvertisingComponent } from './advertising.component';

const routes = [
    {
        path: 'advertising',
        component: FuseAdvertisingComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseAdvertisingComponent
    ],
    imports: [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FuseAdvertisingComponent
    ]
})

export class FuseAdvertisingModule {
}
