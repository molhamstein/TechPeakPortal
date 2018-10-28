import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fuse-editclient',
    templateUrl: './editclient.component.html',
    styleUrls: ['./editclient.component.scss']
})
export class FuseeditClientComponent {
    form: FormGroup;
    formErrors: any;
    editedData:any = {};
    id:any;


    constructor(private formBuilder: FormBuilder, private mainServ: MainService, private route : ActivatedRoute) {
        this.formErrors = {
            email: {},
            username: {},
            realm: {},
            mobile: {},
            gender: {},
            birthdate: {},
            profession: {},
            np: {}
        };



    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required,Validators.email]],
            username: ['', Validators.required],
            realm: ['', Validators.required],
            mobile: ['', Validators.required],
            gender: ['', Validators.required],
            birthdate: ['', Validators.required],
            profession: ['', Validators.required],
            np: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.mainServ.APIServ.get("clients/" + this.id).subscribe((res:any) => {
            this.editedData = res;
            this.editedData.birthdate = new Date (this.editedData.birthdate);
        })
    }

    edit() {
        this.mainServ.APIServ.put("clients", this.editedData).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.goTo("client")
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
