import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseaddCampaignComponent } from './addcampaign.component';

const routes = [
    {
        path     : 'addcampaign',
        component: FuseaddCampaignComponent
    }
];

@NgModule({
    declarations: [
        FuseaddCampaignComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddCampaignComponent
    ]
})

export class FuseaddCampaignModule
{
}
