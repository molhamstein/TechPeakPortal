import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseaddPartnerComponent } from './addpartner.component';

const routes = [
    {
        path     : 'addpartner',
        component: FuseaddPartnerComponent
    }
];

@NgModule({
    declarations: [
        FuseaddPartnerComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddPartnerComponent
    ]
})

export class FuseaddPartnerModule
{
}
