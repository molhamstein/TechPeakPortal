import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'fuse-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})
export class FusePartnerComponent implements OnInit {
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;


    rows = [];
    count: number = 0;
    offset: number = 0;
    limit: number = 10;

    constructor(private http: HttpClient, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
    }


    setPage(offset, limit) {

        this.mainServ.APIServ.get("partners?filter[limit]=" + limit + "&filter[skip]=" + offset * limit).subscribe((data: any) => {
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


    onPage(event) {
        console.log('Page Event', event);
        this.offset = event.offset;
        this.limit = event.limit;
        this.setPage(this.offset, this.limit);
    }

    ngOnInit() {
        this.mainServ.APIServ.get("partners/count").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.count = data['count'];
                this.setPage(this.offset, this.limit);
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

    }

    view(id) {
        this.mainServ.globalServ.goTo("viewpartner/" + id)
    }
    addPartner() {
        this.mainServ.globalServ.goTo("addpartner")
    }

    toggleRow(row) {
        if (row['status'] == 1)
            row['status'] = 0
        else
            row['status'] = 1

        this.mainServ.APIServ.put("partners/" + row['id'], row).subscribe((data: any) => {
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
        this.mainServ.globalServ.goTo("editpartner/" + adsId)
    }
}
