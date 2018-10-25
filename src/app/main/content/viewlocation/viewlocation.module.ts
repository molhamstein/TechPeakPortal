import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FuseviewLocationComponent } from './viewlocation.component';

const routes = [
    {
        path     : 'viewlocation',
        component: FuseviewLocationComponent
    }
];

@NgModule({
    declarations: [
        FuseviewLocationComponent
    ],
    imports     : [
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAfaEzR5KKaRsI6ByG0oEokmAIG4wjZ848'
        }),
        // RouterModule.forChild(routes)
    ],
    exports     : [
        FuseviewLocationComponent
    ]
})

export class FuseviewLocationModule
{
}
