import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { FuseLocationsComponent } from './locations.component';

const routes = [
    {
        path: 'locations',
        component: FuseLocationsComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseLocationsComponent
    ],
    imports: [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FuseLocationsComponent
    ]
})

export class FuseLocationsModule {
}
