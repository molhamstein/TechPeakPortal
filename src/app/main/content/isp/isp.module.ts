import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { FuseISPComponent } from './isp.component';

const routes = [
    {
        path: 'isp',
        component: FuseISPComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseISPComponent
    ],
    imports: [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FuseISPComponent
    ]
})

export class FuseISPModule {
}
