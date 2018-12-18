import { FuseWidgetModule } from './../../../core/components/widget/widget.module';
import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseviewCampaignComponent } from './viewcampaign.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AgmCoreModule } from '@agm/core';
import { DatePipe } from '@angular/common';

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
        RouterModule,
        NgxChartsModule,
        FuseWidgetModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB44dir8VgrRW0Bq5zu1qNdsmIlMIdD2Ak'
        })
    ],
    providers: [
        AuthGuardService,
        DatePipe
    ],
    exports: [
        FuseviewCampaignComponent
    ]
})

export class FuseviewCampaignModule {
}
