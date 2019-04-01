import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'fuse-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss']
})
export class FuseBillingComponent implements OnInit {
    rowsCampaign = [];
    loadingIndicatorCampaign = false;
    reorderableCampaign = true;
    allRowsSelectedCampaign: any;
    campaignCount = 0;

    simpleLoder = false;
    rowsInvoice = [];
    loadingIndicatorInvoice = false;
    reorderableInvoice = true;
    allRowsSelectedInvoice: any;
    invoiceCount = 0;

    netBalance = 0;
    form: FormGroup;
    myControl = new FormControl();
    filteredOptions: Observable<Partners[]>;
    partners: Partners[] = [];
    selectedPartner: any;

    isPartner = false;

    constructor(private http: HttpClient, private translationLoader: FuseTranslationLoaderService, private snack: MatSnackBar,
        private mainServ: MainService, private datePipe: DatePipe, private formBuilder: FormBuilder) {
        this.translationLoader.loadTranslations(english, turkish);
        this.form = this.formBuilder.group({});
    }
    ngOnInit() {
        var role = this.mainServ.loginServ.getRole();
        if (role == "partner") {
            this.isPartner = true;
        }
        this.mainServ.APIServ.get("campaigns/states?isActive=false&isAllCampaign=true").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rowsCampaign = data;
                for (let index = 0; index < this.rowsCampaign.length; index++) {
                    if (this.rowsCampaign[index].campaign.CPI == "") {
                        this.rowsCampaign[index].campaign.CPI = "0";
                    }
                    if (this.rowsCampaign[index].campaign.CPC == "") {
                        this.rowsCampaign[index].campaign.CPC = "0";
                    }
                    this.rowsCampaign[index].totalCost = (parseInt(this.rowsCampaign[index].campaign.CPI) * parseInt(this.rowsCampaign[index].impressions)) + (parseInt(this.rowsCampaign[index].campaign.CPC) * parseInt(this.rowsCampaign[index].clicks));
                    this.campaignCount = this.campaignCount + this.rowsCampaign[index].totalCost;
                }
                this.loadingIndicatorCampaign = true;
                this.netBalance = this.invoiceCount - this.campaignCount;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });


        this.mainServ.APIServ.get('payments?filter[include]=partner').subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rowsInvoice = data;
                for (let index = 0; index < this.rowsInvoice.length; index++) {
                    this.rowsInvoice[index].creation_date = this.datePipe.transform(this.rowsInvoice[index].creation_date, 'yyyy-MM-dd');
                    this.invoiceCount = this.invoiceCount + this.rowsInvoice[index].value;
                }
                this.loadingIndicatorInvoice = true;
                this.netBalance = this.invoiceCount - this.campaignCount;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

        this.mainServ.APIServ.get("partners").subscribe((res: any) => {
            this.partners = res;
            this.filteredOptions = this.myControl.valueChanges
                .pipe(
                    startWith<string | Partners>(''),
                    map(value => typeof value === 'string' ? value : value.fullname),
                    map(title => title ? this._filter(title) : this.partners.slice())
                );
        })

    }

    filterByName() {
        for (let index = 0; index < this.partners.length; index++) {
            if (this.selectedPartner.fullname == this.partners[index].fullname) {
                this.netBalance = 0;
                this.simpleLoder = true;
                this.mainServ.APIServ.get("campaigns/states?partner_id=" + this.partners[index].id + "&isActive=false&isAllCampaign=true").subscribe((data: any) => {
                    this.simpleLoder = false;
                    if (this.mainServ.APIServ.getErrorCode() == 0) {
                        this.rowsCampaign = data;
                        this.campaignCount = 0;
                        for (let index = 0; index < this.rowsCampaign.length; index++) {
                            if (this.rowsCampaign[index].campaign.CPI == "") {
                                this.rowsCampaign[index].campaign.CPI = "0";
                            }
                            if (this.rowsCampaign[index].campaign.CPC == "") {
                                this.rowsCampaign[index].campaign.CPC = "0";
                            }
                            this.rowsCampaign[index].totalCost = (parseInt(this.rowsCampaign[index].campaign.CPI) * parseInt(this.rowsCampaign[index].impressions)) + (parseInt(this.rowsCampaign[index].campaign.CPC) * parseInt(this.rowsCampaign[index].clicks));
                            this.campaignCount = this.campaignCount + this.rowsCampaign[index].totalCost;
                        }
                        this.loadingIndicatorCampaign = true;
                        this.netBalance = this.invoiceCount - this.campaignCount;

                    }
                });
                this.mainServ.APIServ.get('payments?filter[where][partner_id]=' + this.partners[index].id + '&filter[include]=partner').subscribe((data: any) => {
                    if (this.mainServ.APIServ.getErrorCode() == 0) {
                        this.rowsInvoice = data;
                        this.invoiceCount = 0;
                        for (let index = 0; index < this.rowsInvoice.length; index++) {
                            this.rowsInvoice[index].creation_date = this.datePipe.transform(this.rowsInvoice[index].creation_date, 'yyyy-MM-dd');
                            this.invoiceCount = this.invoiceCount + this.rowsInvoice[index].value;
                        }
                        this.loadingIndicatorInvoice = true;
                        this.netBalance = this.invoiceCount - this.campaignCount;
                    }
                });
                return;
            }
        }
        this.snack.open("الرجاء إدخال اسم المستخدم الصحيح", "حسناً")
    }

    getAllData(event) {
        if (this.selectedPartner == "") {
            this.netBalance = 0;
            this.invoiceCount = 0;
            this.campaignCount = 0;
            this.simpleLoder = true;
            this.mainServ.APIServ.get("campaigns/states?isActive=false&isAllCampaign=true").subscribe((data: any) => {
                this.simpleLoder = false;
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.rowsCampaign = data;
                    for (let index = 0; index < this.rowsCampaign.length; index++) {
                        if (this.rowsCampaign[index].campaign.CPI == "") {
                            this.rowsCampaign[index].campaign.CPI = "0";
                        }
                        if (this.rowsCampaign[index].campaign.CPC == "") {
                            this.rowsCampaign[index].campaign.CPC = "0";
                        }
                        this.rowsCampaign[index].totalCost = (parseInt(this.rowsCampaign[index].campaign.CPI) * parseInt(this.rowsCampaign[index].impressions)) + (parseInt(this.rowsCampaign[index].campaign.CPC) * parseInt(this.rowsCampaign[index].clicks));
                        this.campaignCount = this.campaignCount + this.rowsCampaign[index].totalCost;
                    }
                    this.loadingIndicatorCampaign = true;
                    this.netBalance = this.invoiceCount - this.campaignCount;
                }
            });
            this.mainServ.APIServ.get('payments?filter[include]=partner').subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.rowsInvoice = data;
                    for (let index = 0; index < this.rowsInvoice.length; index++) {
                        this.rowsInvoice[index].creation_date = this.datePipe.transform(this.rowsInvoice[index].creation_date, 'yyyy-MM-dd');
                        this.invoiceCount = this.invoiceCount + this.rowsInvoice[index].value;
                    }
                    this.loadingIndicatorInvoice = true;
                    this.netBalance = this.invoiceCount - this.campaignCount;
                }
            });

        }
    }

    displayFn(part?: Partners): string | undefined {
        return part ? part.fullname : undefined;
    }

    private _filter(full: string): Partners[] {
        const filterValue = full.toLowerCase();

        return this.partners.filter(part => part.fullname.toLowerCase().indexOf(filterValue) === 0);
    }

}

export interface Partners {
    fullname: string;
    id: number;
}
