import { FuseWidgetModule } from './../../../core/components/widget/widget.module';
import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseviewCampaignComponent } from './viewcampaign.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AgmCoreModule } from '@agm/core';

const routes = [
    {
        path: 'viewcampaign/:id',
        component: FuseviewCampaignComponent,
        CanActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        FuseviewCampaignComponent
    ],
    imports: [
        SharedModule,
        NgxChartsModule,
        FuseWidgetModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        })

        // RouterModule.forChild(routes)
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        FuseviewCampaignComponent
    ]
})

export class FuseviewCampaignModule {
}
