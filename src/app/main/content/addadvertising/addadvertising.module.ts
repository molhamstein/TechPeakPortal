import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseaddAdvertisingComponent } from './addadvertising.component';

const routes = [
    {
        path     : 'addadvertising',
        component: FuseaddAdvertisingComponent
    }
];

@NgModule({
    declarations: [
        FuseaddAdvertisingComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddAdvertisingComponent
    ]
})

export class FuseaddAdvertisingModule
{
}
