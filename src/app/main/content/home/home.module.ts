import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FusehomeComponent } from './home.component';

const routes = [
    {
        path     : 'home',
        component: FusehomeComponent
    }
];

@NgModule({
    declarations: [
        FusehomeComponent
    ],
    imports     : [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FusehomeComponent
    ]
})

export class FusehomeModule
{
}
