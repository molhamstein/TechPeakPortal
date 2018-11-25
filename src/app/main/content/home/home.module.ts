import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { FusehomeComponent } from './home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

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
        NgxChartsModule,
        FuseWidgetModule,
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FusehomeComponent
    ]
})

export class FusehomeModule
{
}
