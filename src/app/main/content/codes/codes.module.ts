import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseCodesComponent } from './codes.component';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'codes',
        component: FuseCodesComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseCodesComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FuseCodesComponent
    ]
})

export class FuseCodesModule {
}
