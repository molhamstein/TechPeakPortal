import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { FuseeditPartnerComponent } from './editpartner.component';

const routes = [
    {
        path     : 'editpartner',
        component: FuseeditPartnerComponent
    }
];

@NgModule({
    declarations: [
        FuseeditPartnerComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseeditPartnerComponent
    ]
})

export class FuseeditPartnerModule
{
}
