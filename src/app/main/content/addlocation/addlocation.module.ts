import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { FuseaddLocationComponent } from './addlocation.component';
import { AgmCoreModule } from '@agm/core';

const routes = [
    {
        path     : 'addlocation',
        component: FuseaddLocationComponent
    }
];

@NgModule({
    declarations: [
        FuseaddLocationComponent
    ],
    imports     : [
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB44dir8VgrRW0Bq5zu1qNdsmIlMIdD2Ak'
        }),
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddLocationComponent
    ]
})

export class FuseaddLocationModule
{
}
