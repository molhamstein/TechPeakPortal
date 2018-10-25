import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseImpressionsComponent } from './impressions.component';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'impressions',
        component: FuseImpressionsComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseImpressionsComponent
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
        FuseImpressionsComponent
    ]
})

export class FuseImpressionsModule {
}
