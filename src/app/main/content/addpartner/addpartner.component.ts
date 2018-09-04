import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'fuse-addpartner',
    templateUrl: './addpartner.component.html',
    styleUrls: ['./addpartner.component.scss']
})
export class FuseaddPartnerComponent {
    form: FormGroup;
    formErrors: any;



    constructor(private formBuilder: FormBuilder, private mainServ: MainService) {
        this.formErrors = {
            fullname: {},
            partner_mobile: {},
            businessName: {},
            balance: {},
            min_balance: {},          
            email: {},
            username: {},
            realm: {},
            password: {},
            rePassword: {},
        };



    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            fullname: ['', Validators.required],
            partner_mobile: ['', Validators.required],
            businessName: ['', Validators.required],
            balance: ['', Validators.required],
            min_balance: ['', Validators.required],
            email: ['', [Validators.required,Validators.email]],
            username: ['', Validators.required],
            realm: ['', Validators.required],
            password: ['', Validators.required],
            rePassword: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    addAds() {
        var data = this.form.value;
        this.mainServ.APIServ.post("partners", data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.goTo("partner")
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }

    onFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }
            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);
            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }
}
