import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FusePOSComponent } from './pos.component';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'pos',
        component: FusePOSComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FusePOSComponent
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
        FusePOSComponent
    ]
})

export class FusePOSModule {
}
