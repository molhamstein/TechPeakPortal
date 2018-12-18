import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FuseaddPOSComponent } from './addpos.component';

const routes = [
    {
        path     : 'addpos',
        component: FuseaddPOSComponent
    }
];

@NgModule({
    declarations: [
        FuseaddPOSComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddPOSComponent
    ]
})

export class FuseaddPOSModule
{
}
