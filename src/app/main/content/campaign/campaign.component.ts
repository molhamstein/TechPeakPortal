import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import swal from 'sweetalert2';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { myDialogComponent } from './my-dialog.component';


@Component({
    selector: 'fuse-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.scss']
})
export class FuseCampaignComponent implements OnInit {
    form: FormGroup;
    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    isAdmin = true;
    selectedStatus: any;

    constructor(private http: HttpClient, private translationLoader: FuseTranslationLoaderService,
        private mainServ: MainService, private dialog: MatDialog, private formBuilder: FormBuilder,
        /* private dialogRef: MatDialogRef<FuseCampaignComponent>, */) {

        this.translationLoader.loadTranslations(english, turkish);

        this.form = this.formBuilder.group({
            status: ['', Validators.required],
            view_impressions: ['', Validators.required],
        });
    }
    ngOnInit() {

        var role = this.mainServ.loginServ.getRole();
        if (role == "partner") {
            this.isAdmin = false;
        }

        this.mainServ.APIServ.get("campaigns?filter[order]=id%20DESC").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rows = data;
                for (let index = 0; index < this.rows.length; index++) {
                    var today = new Date();
                    var exp = new Date(this.rows[index].expiration_date);
                    if (this.rows[index].status == "active" && this.rows[index].completed == this.rows[index].target) {
                        this.rows[index].status = "completed";
                    } else
                        if (this.rows[index].status == "active" && today.getTime() > exp.getTime()) {
                            this.rows[index].status = "expired";
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

    open(row) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.direction = "rtl";
        dialogConfig.width = "40%";
        dialogConfig.height = "45%";
        dialogConfig.data = {
            status: row.status,
            view_impressions: row.view_impressions
        };
        const dialogRef = this.dialog.open(myDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data != undefined) {
                if (data.status == "completed" || data.status == "expired") {
                    data.status = "active"
                }
                row.status = data.status;
                row.view_impressions = data.view_impressions;
                this.mainServ.APIServ.put("campaigns", row).subscribe(res => {
                    this.mainServ.APIServ.get("campaigns?filter[order]=id%20DESC").subscribe((data: any) => {
                        if (this.mainServ.APIServ.getErrorCode() == 0) {
                            this.rows = data;
                            for (let index = 0; index < this.rows.length; index++) {
                                var today = new Date();
                                var exp = new Date(this.rows[index].expiration_date);

                                if (this.rows[index].status == "active" && this.rows[index].completed == this.rows[index].target) {
                                    this.rows[index].status = "completed";
                                }
                                else if (this.rows[index].status == "active" && today.getTime() > exp.getTime()) {
                                    this.rows[index].status = "expired";
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
                })
            }
        });

    }

    edit(camp) {
        swal({
            title: 'تعديل الحملة',
            input: 'select',
            inputOptions: {
                'active': 'Active',
                'pending': 'Pending',
                'deactivated': 'Deactivated',
            },
            /*  html: '<select id="d" style="height:28px; width:150px; color:#545454; font-size:1.125em;"> <option value="" disabled selected>إظهار المشاهدات و النقرات</option> <option value="yes">نعم</option> <option value="No">لا</option> </select>', */
            inputPlaceholder: 'تغيير الحالة',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value !== '') {
                        camp.status = value;
                        this.mainServ.APIServ.put("campaigns", camp).subscribe(res => {
                            for (let index = 0; index < this.rows.length; index++) {
                                if (this.rows[index].id == camp.id) {
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
