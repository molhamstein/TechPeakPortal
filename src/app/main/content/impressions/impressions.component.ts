import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'fuse-impressions',
    templateUrl: './impressions.component.html',
    styleUrls: ['./impressions.component.scss']
})
export class FuseImpressionsComponent implements OnInit {
    form: FormGroup;
    rows: any = [];
    loadingIndicator = false;
    rowsCount: any = 0;
    locations: any = [{ name: "ALL" }];
    currentLocation: any;
    reorderable = true;
    allRowsSelected: any;
    constructor(private http: HttpClient, private formBuilder: FormBuilder, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
        this.translationLoader.loadTranslations(english, turkish);
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            location: [''],
        });

        /* this.mainServ.APIServ.get('locations').subscribe(res => {
            this.locations = res;
        }) */

        this.mainServ.APIServ.get('impressions?filter={"include":["location","ad"]}').subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rows = data;
                this.rowsCount = this.rows.length;
                for (let index = 0; index < this.rows.length; index++) {
                    if (this.rows[index].location_id == 0) {
                        this.rows[index].location = { name: "" }
                        this.rows[index].location.name = "لا يوجد موقع"
                    }
                    else {
                        var bool = false;
                        for (let i = 0; i < this.locations.length; i++) {
                            if (this.rows[index].location_id == this.locations[i].id && this.locations[i].name != "ALL") {
                                bool = false;
                                break;
                            }
                            else { bool = true }
                        }
                        if (bool == true) {
                            this.locations.push(this.rows[index].location);
                        }
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

    selectLocation(selectedLocation) {
        if (selectedLocation.name == "ALL") {
            this.mainServ.APIServ.get('impressions?filter={"include":["location","ad"]}').subscribe((data: any) => {
                this.rows = data;
                this.rowsCount = this.rows.length;
                for (let index = 0; index < this.rows.length; index++) {
                    if (this.rows[index].location_id == 0) {
                        this.rows[index].location = { name: "" }
                        this.rows[index].location.name = "لا يوجد موقع"
                    }
                }

            })
        }
        else {
            this.mainServ.APIServ.get('impressions?filter={"where":{"and":[{"location_id":' + selectedLocation.id + '}]},"include":["location","ad"]}')
                .subscribe(data => {
                    this.rows = data;
                    this.rowsCount = this.rows.length;
                })
        }

    }
}
