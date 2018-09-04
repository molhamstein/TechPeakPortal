import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FuseaddClientComponent } from './addclient.component';

const routes = [
    {
        path     : 'addclient',
        component: FuseaddClientComponent
    }
];

@NgModule({
    declarations: [
        FuseaddClientComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddClientComponent
    ]
})

export class FuseaddClientModule
{
}
