import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import swal from 'sweetalert2';

@Component({
    selector: 'fuse-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.scss']
})
export class FuseCampaignComponent implements OnInit {
    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    isAdmin = true;
    
    constructor(private http: HttpClient, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
        this.translationLoader.loadTranslations(english, turkish);
    }
    ngOnInit() {

        var role = this.mainServ.loginServ.getRole();
        if (role == "partner") {
            this.isAdmin = false;
        }

        this.mainServ.APIServ.get("campaigns").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rows = data;
                for (let index = 0; index < this.rows.length; index++) {
                    var today = new Date();
                    var exp = new Date(this.rows[index].expiration_date);
                    if (this.rows[index].status == "active" && today.getDate() > exp.getDate()) {
                        this.rows[index].status = "expired";
                    }
                    if (this.rows[index].status == "active" && this.rows[index].completed == this.rows[index].target) {
                        this.rows[index].status = "completed";
                    }
                }
                this.loadingIndicator = true;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }


    view(id) {
        this.mainServ.globalServ.goTo("viewcampaign/" + id)
    }

    addAds() {
        this.mainServ.globalServ.goTo("addcampaign")
    }

    toggleRow(row) {
        if (row['status'] == 1)
            row['status'] = 0
        else
            row['status'] = 1

        this.mainServ.APIServ.put("campaigns/" + row['id'], row).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.reload();
                // this.loadingIndicator = false;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }

    /* edit(adsId) {
        this.mainServ.globalServ.goTo("editcampaign/" + adsId)
    } */

    edit(camp) {
        swal({
        title: 'Select field validation',
        input: 'select',
        inputOptions: {
          'active': 'Active',
          'pending': 'Pending',
          'deactivated': 'Deactivated',
        },
        inputPlaceholder: 'تغيير الحالة',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== '') {
                camp.status = value;
                this.mainServ.APIServ.put("campaigns", camp).subscribe(res => {
                    for (let index = 0; index < this.rows.length; index++) {
                        if(this.rows[index].id == camp.id) {
                            this.rows[index].status = value;
                        }
                    }
                    swal('Status has been changed to: ' + value)
                    
                },
                err => { resolve('Something is Wrong Please Re-enter') }
                )
                
                
              } else {
                resolve('You need to select status')
              }
          })
        }
      })
    }
}
