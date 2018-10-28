import { Partners } from './../editlocation/editlocation.component';
import { AddPaymentsComponent } from './../dialog/add-payments/add-payments.component';
import { MatDialog } from '@angular/material';
import { element } from 'protractor';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'fuse-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class FusePaymentComponent implements OnInit {
    form: FormGroup;

    partners;
    addPartner;
    rows = [];
    loadingIndicator = false
    currentPartner = { fullname: "ALL", id: "" }
    rowsCount;
    totalPayments = 0;
    constructor(private http: HttpClient, private formBuilder: FormBuilder
        , private translationLoader: FuseTranslationLoaderService, private mainServ: MainService,
        public dialog: MatDialog) {

    }

    dialogRef: any;

    edit(object) {
        this.dialogRef = this.dialog.open(AddPaymentsComponent, {
            panelClass: 'event-form-dialog',
            data: {
                type: "edit",
                payment: object,
                partners: this.addPartner
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                this.selectPartner(this.currentPartner)
            });

    }

    add() {

        this.dialogRef = this.dialog.open(AddPaymentsComponent, {
            panelClass: 'event-form-dialog',
            data: {
                type: "add",
                partners: this.addPartner
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                this.selectPartner(this.currentPartner)
            });

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            partner: [''],
        });
        this.mainServ.APIServ.get('partners').subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {

                this.loadingIndicator = true;
                this.partners = data;
                this.addPartner = data;
                this.partners.unshift({ fullname: "ALL", id: "" })
                this.selectPartner(this.currentPartner)
            }
        })

    }

    selectPartner(partner) {
        this.loadingIndicator = false;

        if (partner.fullname == "ALL") {
            this.mainServ.APIServ.get('payments?filter={"include":"partner"}').subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.rows = data;
                    this.loadingIndicator = true;

                    this.rowsCount = this.rows.length;
                    this.calcTotalPayments();
                }
            })
        }
        else
            this.mainServ.APIServ.get('payments?filter={"where":{"and":[{"partner_id":' + partner.id + '}]},"include":"partner"}')
                .subscribe((data: any) => {
                    if (this.mainServ.APIServ.getErrorCode() == 0) {
                        this.loadingIndicator = true;
                        this.rows = data;
                        this.rowsCount = this.rows.length;
                        this.calcTotalPayments();
                    }
                })

    }


    calcTotalPayments() {
        this.totalPayments = 0;
        this.rows.forEach(element => {
            this.totalPayments += element.value;
        });
    }

    delete(row) {
        this.loadingIndicator = false;
        this.mainServ.APIServ.delete('partners/' + row.id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.loadingIndicator = true;

                this.selectPartner(this.currentPartner)
            }
        })
    }
}
