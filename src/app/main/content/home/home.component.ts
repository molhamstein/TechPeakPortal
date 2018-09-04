import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'fuse-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class FusehomeComponent {

    compagins=[]

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private mainServ: MainService) {


    }

    ngOnInit() {
        this.mainServ.APIServ.get("campaigns/states?").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.compagins = data;
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

    }





}
