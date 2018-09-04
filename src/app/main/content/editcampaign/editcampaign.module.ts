import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseeditCampaignComponent } from './editcampaign.component';

const routes = [
    {
        path: 'editcampaign/:id',
        component: FuseeditCampaignComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseeditCampaignComponent
    ],
    imports: [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FuseeditCampaignComponent
    ]
})

export class FuseeditCampaignModule {
}
