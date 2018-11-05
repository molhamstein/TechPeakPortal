import { AddPaymentsComponent } from './main/content/dialog/add-payments/add-payments.component';
import { FusePaymentModule } from './main/content/payment/payment.module';
import { FusePaymentComponent } from './main/content/payment/payment.component';
import { FuseClickedModule } from './main/content/clicked/clicked.module';
import { FuseClickedComponent } from './main/content/clicked/clicked.component';
import { FusePartnerModule } from './main/content/partner/partner.module';
import { FuseaddPartnerModule } from './main/content/addpartner/addpartner.module';
import { FuseClientModule } from './main/content/client/client.module';
import { FuseaddClientModule } from './main/content/addclient/addclient.module';
import { FusePartnerComponent } from './main/content/partner/partner.component';
import { FuseaddPartnerComponent } from './main/content/addpartner/addpartner.component';
import { FuseaddClientComponent } from './main/content/addclient/addclient.component';
import { FuseClientComponent } from './main/content/client/client.component';
import { FuseviewCampaignModule } from './main/content/viewcampaign/viewcampaign.module';
import { FuseCampaignModule } from './main/content/campaign/campaign.module';
import { FuseaddCampaignModule } from './main/content/addcampaign/addcampaign.module';
import { FuseviewCampaignComponent } from './main/content/viewcampaign/viewcampaign.component';
import { FuseaddCampaignComponent } from './main/content/addcampaign/addcampaign.component';
import { FuseCampaignComponent } from './main/content/campaign/campaign.component';
import { FuseAdvertisingComponent } from './main/content/advertising/advertising.component';
import { FuseeditAdvertisingComponent } from './main/content/editdvertising/editadvertising.component';
import { FuseaddAdvertisingComponent } from './main/content/addadvertising/addadvertising.component';
import { FuseaddAdvertisingModule } from './main/content/addadvertising/addadvertising.module';
import { FuseAdvertisingModule } from './main/content/advertising/advertising.module';
import { FuseeditAdvertisingModule } from './main/content/editdvertising/editadvertising.module';
import { FusehomeModule } from './main/content/home/home.module';
import { FusehomeComponent } from './main/content/home/home.component';
import { PagesModule } from './main/content/pages/pages.module';
import { GlobalService } from './core/services/global.service';
import { MainService } from './core/services/main.service';
import { LoginService } from './core/services/login.service';
import { CallApiService } from './core/services/call-api.service';
import { AuthGuardService } from './core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { TranslateModule } from '@ngx-translate/core';
import { FuseImpressionsComponent } from './main/content/impressions/impressions.component';
import { FuseImpressionsModule } from './main/content/impressions/impressions.module';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FuseLocationsComponent } from './main/content/locations/locations.component';
import { FuseLocationsModule } from './main/content/locations/locations.module';
import { FuseaddLocationComponent } from './main/content/addlocation/addlocation.component';
import { FuseaddLocationModule } from './main/content/addlocation/addlocation.module';
import { AgmCoreModule } from '@agm/core';
import { FuseeditLocationComponent } from './main/content/editlocation/editlocation.component';
import { FuseeditLocationModule } from './main/content/editlocation/editlocation.module';
import { FuseviewLocationComponent } from './main/content/viewlocation/viewlocation.component';
import { FuseviewLocationModule } from './main/content/viewlocation/viewlocation.module';
import { FuseBillingComponent } from './main/content/billing/billing.component';
import { FuseBillingModule } from './main/content/billing/billing.module';
import { FuseeditPartnerComponent } from './main/content/editpartner/editpartner.component';
import { FuseeditPartnerModule } from './main/content/editpartner/editpartner.module';
import { FuseeditClientModule } from './main/content/editclient/editclient.module';
import { FuseeditClientComponent } from './main/content/editclient/editclient.component';
import { RoleGuardService } from './core/services/role-guard.service';

const appRoutes: Routes = [

    {
        path: 'billing',
        component: FuseBillingComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'locations',
        component: FuseLocationsComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'addlocation',
        component: FuseaddLocationComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'editlocation/:id',
        component: FuseeditLocationComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'viewlocation/:id',
        component: FuseviewLocationComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'campaign',
        component: FuseCampaignComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'addcampaign',
        component: FuseaddCampaignComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'viewcampaign/:id',
        component: FuseviewCampaignComponent,
        canActivate: [AuthGuardService]
    },

    {
        path: 'addadvertising',
        component: FuseaddAdvertisingComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'editadvertising/:id',
        component: FuseeditAdvertisingComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'advertising',
        component: FuseAdvertisingComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'client',
        component: FuseClientComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'addclient',
        component: FuseaddClientComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'editclient/:id',
        component: FuseeditClientComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'partner',
        component: FusePartnerComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'addpartner',
        component: FuseaddPartnerComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'payment',
        component: FusePaymentComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },

    {
        path: 'editpartner/:id',
        component: FuseeditPartnerComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: { 
            expectedRole: 'admin'
          }
    },
    {
        path: 'clicked',
        component: FuseClickedComponent,
        canActivate: [AuthGuardService]
    },

    {
        path: 'impressions',
        component: FuseImpressionsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'home',
        component: FusehomeComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: '',
        pathMatch: 'full',
        component: FusehomeComponent,
        canActivate: [AuthGuardService],
    },

];

@NgModule({
    declarations: [
        AppComponent,
        // dialog
        AddPaymentsComponent
        // end Dialog
    ],
    imports: [
        
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        
        SharedModule,
        TranslateModule.forRoot(),

        FuseMainModule,
        FuseSampleModule,
        PagesModule,
        FusehomeModule,
        FuseAdvertisingModule,
        FuseaddAdvertisingModule,
        FuseeditAdvertisingModule,

        FuseaddCampaignModule,
        FuseCampaignModule,
        FuseviewCampaignModule,

        FusePartnerModule,
        FuseaddPartnerModule,
        FuseeditPartnerModule,
        FuseClientModule,
        FuseaddClientModule,
        FuseeditClientModule,

        FuseClickedModule,
        FuseImpressionsModule,

        FuseLocationsModule,
        FuseaddLocationModule,
        FuseeditLocationModule,
        FuseviewLocationModule,
        FusePaymentModule,
        FuseBillingModule,

        RouterModule.forRoot(appRoutes , { enableTracing: false, useHash: true }),
    ],
    providers: [
        AuthGuardService,
        RoleGuardService,
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        CallApiService,
        LoginService,
        MainService,
        GlobalService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    entryComponents: [AddPaymentsComponent],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
