import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FuseaddISPComponent } from './addisp.component';

const routes = [
    {
        path     : 'addisp',
        component: FuseaddISPComponent
    }
];

@NgModule({
    declarations: [
        FuseaddISPComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddISPComponent
    ]
})

export class FuseaddISPModule
{
}
