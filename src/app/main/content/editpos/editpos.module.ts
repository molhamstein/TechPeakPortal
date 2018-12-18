import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FuseeditPOSComponent } from './editpos.component';

const routes = [
    {
        path     : 'editpos',
        component: FuseeditPOSComponent
    }
];

@NgModule({
    declarations: [
        FuseeditPOSComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseeditPOSComponent
    ]
})

export class FuseeditPOSModule
{
}
