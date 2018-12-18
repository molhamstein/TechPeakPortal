import { paidAccessComponent } from './../dialog/paid-access/paid-access.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'fuse-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss']
})
export class FusePOSComponent implements OnInit {
    form: FormGroup;
    rows: any = [];
    loadingIndicator = false;
    rowsCount: any = 0;
    locations: any = [{ name: "ALL" }];
    currentLocation: any;
    reorderable = true;
    allRowsSelected: any;
    locationURL = "";
    colorsLocation = [];
    constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
        this.translationLoader.loadTranslations(english, turkish);
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            location: [''],
        });

        /* this.mainServ.APIServ.get('locations').subscribe(res => {
            this.locations = res;
        }) */

        this.mainServ.APIServ.get('locations/getMyLocations').subscribe(res => {
            this.loadingIndicator = true;
            this.locations = res;
            this.locations.push({ name: "ALL" });
            this.currentLocation = this.locations[0];
            this.selectLocation(this.currentLocation)
            this.fillColorArrray()
        })





        // this.mainServ.APIServ.get('clicks?filter={"include":["location","ad","campaign"]}').subscribe((data: any) => {
        //     if (this.mainServ.APIServ.getErrorCode() == 0) {
        //         this.rows = data;
        //         this.rowsCount = this.rows.length;
        //         for (let index = 0; index < this.rows.length; index++) {
        //             if (this.rows[index].campaign_id == null) {
        //                 var temcamp = { name: "" };
        //                 this.rows[index].campaign = temcamp;
        //             }
        //             if (this.rows[index].location_id == 0) {
        //                 this.rows[index].location = { name: "" }
        //                 this.rows[index].location.name = "لا يوجد موقع"
        //             }
        //             else {
        //                 var bool = false;
        //                 for (let i = 0; i < this.locations.length; i++) {
        //                     if (this.rows[index].location_id == this.locations[i].id && this.locations[i].name != "ALL") {
        //                         bool = false;
        //                         break;
        //                     }
        //                     else { bool = true }
        //                 }
        //                 if (bool == true) {
        //                     this.locations.push(this.rows[index].location);
        //                 }
        //             }
        //         }
        //         this.loadingIndicator = true;

        //     }
        //     else if (this.mainServ.APIServ.getErrorCode() == 400) {

        //     }
        //     else {
        //         this.mainServ.globalServ.somthingError();
        //     }

        // });
    }


    dialogRef
    addPaidAccess(seller_id, type) {
        this.dialogRef = this.dialog.open(paidAccessComponent, {
            panelClass: 'event-form-dialog',
            width: "500px",
            data: {
                type: type,
                seller_id: seller_id
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((result: any) => {
                if (result) {
                    this.selectLocation(this.currentLocation)
                }
            });
    }
    view(id) {
        this.mainServ.globalServ.goTo("viewpos/"+id)
    }
    edit(id) {
        this.mainServ.globalServ.goTo("editpos/"+id)
    }

    fillColorArrray() {
        for (var index = 0; index < this.locations.length; index++) {
            var element = this.locations[index];
            var color = this.mainServ.globalServ.getColor(index)
            this.colorsLocation[element.id] = color
        }
    }


    addpos() {
        this.mainServ.globalServ.goTo("addpos")
    }

    selectLocation(selectedLocation) {
        if (selectedLocation.name == "ALL") {
            this.mainServ.APIServ.get('seller?filter={"include":["locations"]}').subscribe((data: any) => {
                this.rows = data;
                this.rowsCount = this.rows.length;
            })
        }
        else {
            this.mainServ.APIServ.get('seller?filter={"where":{"and":[{"location_id":' + selectedLocation.id + '}]},"include":["locations"]}')
                .subscribe(data => {
                    this.rows = data;

                    this.rowsCount = this.rows.length;
                })
        }

    }
}
