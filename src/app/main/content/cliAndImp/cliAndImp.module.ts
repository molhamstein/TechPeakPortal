import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseCliAndImpComponent } from './cliAndImp.component';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'cliAndImp',
        component: FuseCliAndImpComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseCliAndImpComponent
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
        FuseCliAndImpComponent
    ]
})

export class FuseCliAndImpModule {
}
