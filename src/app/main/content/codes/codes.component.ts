import { generateCodeComponent } from './../dialog/generate-code/generate-code.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'fuse-codes',
    templateUrl: './codes.component.html',
    styleUrls: ['./codes.component.scss']
})
export class FuseCodesComponent implements OnInit {
    form: FormGroup;
    rows: any = [];
    loadingIndicator = false;
    rowsCount: any = 0;
    currentLocation: any;
    reorderable = true;
    allRowsSelected: any;
    locationURL = "";
    locations
    categories
    hoverArray = [];
    colorsCatrgories = [];
    state = {}
    constructor(private http: HttpClient, public dialog: MatDialog, private formBuilder: FormBuilder, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
        // this.translationLoader.loadTranslations(english, turkish);z
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            location: [''],
        });

        this.mainServ.APIServ.get('locations/getMyLocations').subscribe(res => {
            this.loadingIndicator = true;
            this.locations = res;
            this.currentLocation = this.locations[0];
            this.getData()
        })
    }

    getData() {
        this.mainServ.APIServ.get("partners/getCategories?location_id=" + this.currentLocation.id + "&type=sold").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.hoverArray = [];
                this.colorsCatrgories = [];
                this.loadingIndicator = true;
                this.categories = data;
                this.fillColorArrray()

            }
        })
        this.mainServ.APIServ.get("locations/paidLocationsState?location_id=" + this.currentLocation.id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.state=data;
            }
        })
    }


    fillColorArrray() {
        for (var index = 0; index < this.categories.length; index++) {
            var element = this.categories[index];
            this.hoverArray[index] = false;
            var color = this.mainServ.globalServ.getColor(index)
            this.colorsCatrgories[index] = { "mainColor": color + "99", "secondeColor": color };
        }
    }
    dialogRef
    generateCode(object) {
        this.dialogRef = this.dialog.open(generateCodeComponent, {
            panelClass: 'event-form-dialog',
            width: "500px",
            data: {
                data: object,
                locations: this.locations
            }
        });
        this.dialogRef.afterClosed()

    }

    selectLocation() {
        this.getData()
        // if (selectedLocation.name == "ALL") {
        //     this.mainServ.APIServ.get('clicks?filter={"include":["location","ad","campaign"]}').subscribe((data: any) => {
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
        //         }

        //     })
        // }
        // else {
        //     this.mainServ.APIServ.get('clicks?filter={"where":{"and":[{"location_id":' + selectedLocation.id + '}]},"include":["location","ad","campaign"]}')
        //         .subscribe(data => {
        //             this.rows = data;
        //             for (let index = 0; index < this.rows.length; index++) {
        //                 if (this.rows[index].campaign_id == null) {
        //                     var temcamp = { name: "" };
        //                     this.rows[index].campaign = temcamp;
        //                 }
        //             }
        //             this.rowsCount = this.rows.length;
        //         })
        // }

    }
}
