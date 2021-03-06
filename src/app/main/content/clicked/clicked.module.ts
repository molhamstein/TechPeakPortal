import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseClickedComponent } from './clicked.component';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'clicked',
        component: FuseClickedComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseClickedComponent
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
        FuseClickedComponent
    ]
})

export class FuseClickedModule {
}
