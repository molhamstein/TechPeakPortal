import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FuseeditLocationComponent } from './editlocation.component';

const routes = [
    {
        path     : 'editlocation',
        component: FuseeditLocationComponent
    }
];

@NgModule({
    declarations: [
        FuseeditLocationComponent
    ],
    imports     : [
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB44dir8VgrRW0Bq5zu1qNdsmIlMIdD2Ak'
        }),
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseeditLocationComponent
    ]
})

export class FuseeditLocationModule
{
}
