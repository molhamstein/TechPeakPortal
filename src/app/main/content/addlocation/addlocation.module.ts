import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { FuseaddLocationComponent } from './addlocation.component';
import { AgmCoreModule } from '@agm/core';

const routes = [
    {
        path     : 'addlocation',
        component: FuseaddLocationComponent
    }
];

@NgModule({
    declarations: [
        FuseaddLocationComponent
    ],
    imports     : [
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAfaEzR5KKaRsI6ByG0oEokmAIG4wjZ848'
        }),
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseaddLocationComponent
    ]
})

export class FuseaddLocationModule
{
}
