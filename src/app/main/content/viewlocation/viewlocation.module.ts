import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FuseviewLocationComponent } from './viewlocation.component';

const routes = [
    {
        path     : 'viewlocation',
        component: FuseviewLocationComponent
    }
];

@NgModule({
    declarations: [
        FuseviewLocationComponent
    ],
    imports     : [
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB44dir8VgrRW0Bq5zu1qNdsmIlMIdD2Ak'
        }),
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseviewLocationComponent
    ]
})

export class FuseviewLocationModule
{
}
