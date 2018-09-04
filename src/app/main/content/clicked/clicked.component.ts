import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'fuse-clicked',
    templateUrl: './clicked.component.html',
    styleUrls: ['./clicked.component.scss']
})
export class FuseClickedComponent implements OnInit {
    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    constructor(private http: HttpClient, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
        this.translationLoader.loadTranslations(english, turkish);
    }
    ngOnInit() {
        this.mainServ.APIServ.get("ADs").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rows = data;
                // this.loadingIndicator = false;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }



    addAds() {
        this.mainServ.globalServ.goTo("addclicked")
    }

    toggleRow(row) {
        if (row['status'] == 1)
            row['status'] = 0
        else
            row['status'] = 1

        this.mainServ.APIServ.put("ADs/" + row['id'], row).subscribe((data: any) => {
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

    edit(adsId) {
        this.mainServ.globalServ.goTo("editclicked/" + adsId)
    }
}
