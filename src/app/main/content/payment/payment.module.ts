import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FusePaymentComponent } from './payment.component';

const routes = [
    {
        path: 'payment',
        component: FusePaymentComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FusePaymentComponent
    ],
    imports: [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FusePaymentComponent
    ]
})

export class FusePaymentModule {
}
