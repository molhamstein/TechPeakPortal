import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseCampaignComponent } from './campaign.component';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { myDialogComponent } from './my-dialog.component';

const routes = [
    {
        path: 'campaign',
        component: FuseCampaignComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseCampaignComponent,
        myDialogComponent
    ],
    imports: [
        SharedModule,
        MatDialogModule,
        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService,
    ],
    exports: [
        FuseCampaignComponent
    ],
    entryComponents: [myDialogComponent]
})

export class FuseCampaignModule {
}
