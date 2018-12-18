import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseviewPosComponent } from './view-pos.component';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'view-pos',
        component: FuseviewPosComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseviewPosComponent
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
        FuseviewPosComponent
    ]
})

export class FuseviewPosModule {
}
