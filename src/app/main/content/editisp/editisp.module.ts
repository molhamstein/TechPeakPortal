import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FuseeditISPComponent } from './editisp.component';

const routes = [
    {
        path     : 'editisp',
        component: FuseeditISPComponent
    }
];

@NgModule({
    declarations: [
        FuseeditISPComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseeditISPComponent
    ]
})

export class FuseeditISPModule
{
}
