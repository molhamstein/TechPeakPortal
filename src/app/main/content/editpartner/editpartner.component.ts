import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fuse-editpartner',
    templateUrl: './editpartner.component.html',
    styleUrls: ['./editpartner.component.scss']
})
export class FuseeditPartnerComponent {
    form: FormGroup;
    formErrors: any;
    editedData:any = {};
    id:any;

    constructor(private formBuilder: FormBuilder, private mainServ: MainService, private route : ActivatedRoute) {
        this.formErrors = {
            fullname: {},
            partner_mobile: {},
            businessName: {},
            min_balance: {},          
            email: {},
            username: {},
            realm: {},
            status: {},
        };

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            fullname: ['', Validators.required],
            partner_mobile: ['', Validators.required],
            businessName: ['', Validators.required],
            min_balance: ['', Validators.required],
            email: ['', [Validators.required,Validators.email]],
            username: ['', Validators.required],
            realm: ['', Validators.required],
            status: ['', Validators.required],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.mainServ.APIServ.get("partners/" + this.id).subscribe((res:any) => {
            this.editedData = res;
        })
    }

    edit() {
        this.mainServ.APIServ.put("partners", this.editedData).subscribe((data: any) => {
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
