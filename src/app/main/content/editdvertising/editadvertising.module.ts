import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseeditAdvertisingComponent } from './editadvertising.component';

const routes = [
    {
        path     : 'editadvertising/:id',
        component: FuseeditAdvertisingComponent
    }
];

@NgModule({
    declarations: [
        FuseeditAdvertisingComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseeditAdvertisingComponent
    ]
})

export class FuseeditAdvertisingModule
{
}
