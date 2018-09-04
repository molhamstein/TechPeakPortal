import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FusePartnerComponent } from './partner.component';

const routes = [
    {
        path: 'partner',
        component: FusePartnerComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FusePartnerComponent
    ],
    imports: [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FusePartnerComponent
    ]
})

export class FusePartnerModule {
}
