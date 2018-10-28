import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseeditClientComponent } from './editclient.component';

const routes = [
    {
        path     : 'editclient',
        component: FuseeditClientComponent
    }
];

@NgModule({
    declarations: [
        FuseeditClientComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseeditClientComponent
    ]
})

export class FuseeditClientModule
{
}
