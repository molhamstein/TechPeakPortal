import { paidAccessComponent } from './../dialog/paid-access/paid-access.component';
import { ActivatedRoute } from '@angular/router';
import { generateCodeComponent } from './../dialog/generate-code/generate-code.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'fuse-view-pos',
    templateUrl: './view-pos.component.html',
    styleUrls: ['./view-pos.component.scss']
})
export class FuseviewPosComponent implements OnInit {
    loadingIndicator = false;
    categories
    hoverArray = [];
    colorsCatrgories = [];
    state = {}
    id;
    pos;

    rowsCountPaidaccess: number = 0;
    rowsPaidaccess = [];
    countPaidaccess: number = 0;
    offsetPaidaccess: number = 0;
    limitPaidaccess: number = 10;

    rowsCountPaidaccesswithdraw: number = 0;
    rowsPaidaccesswithdraw = [];
    countPaidaccesswithdraw: number = 0;
    offsetPaidaccesswithdraw: number = 0;
    limitPaidaccesswithdraw: number = 10;


    constructor(private http: HttpClient, public dialog: MatDialog, private route: ActivatedRoute, private formBuilder: FormBuilder, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
        // this.translationLoader.loadTranslations(english, turkish);z
    }

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
                    this.getData();
                }
            });
    }




    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));

        this.mainServ.APIServ.get('seller/' + this.id + '?filter={"include":["locations"]}').subscribe(res => {
            this.loadingIndicator = true;
            this.pos = res;
            this.getData()
        })
    }

    getData() {

        this.mainServ.APIServ.get("seller/getCategories?seller_id=" + this.id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.loadingIndicator = true;
                this.categories = data;
                this.fillColorArrray()
            }
        })

        this.mainServ.APIServ.get("seller/getState?seller_id=" + this.id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.state = data;
            }
        })
        var filter = { "seller_id": this.id }
        this.mainServ.APIServ.get("paidAccess/count?where=" + JSON.stringify(filter)).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rowsCountPaidaccess = data['count'];
                this.setPagePaidaccess(this.offsetPaidaccess, this.limitPaidaccess);
            }
        })
        this.mainServ.APIServ.get("painAceessWithDraw/count?where=" + JSON.stringify(filter)).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rowsCountPaidaccesswithdraw = data['count'];
                this.setPagePaidaccesswithdraw(this.offsetPaidaccesswithdraw, this.limitPaidaccesswithdraw);
            }
        })

    }

    onPagePaidaccess(event) {
        console.log('Page Event', event);
        this.offsetPaidaccess = event.offset;
        this.limitPaidaccess = event.limit;
        this.setPagePaidaccess(this.offsetPaidaccess, this.limitPaidaccess);

    }

    onPagePaidaccesswithdraw(event) {
        console.log('Page Event', event);
        this.offsetPaidaccesswithdraw = event.offset;
        this.limitPaidaccesswithdraw = event.limit;
        this.setPagePaidaccess(this.offsetPaidaccesswithdraw, this.limitPaidaccesswithdraw);
    }

    setPagePaidaccess(offset, limit) {
        var filter = { "where": { "seller_id": this.id }, "limit": limit, "skip": offset * limit ,"include":['client']}

        this.mainServ.APIServ.get("paidAccess?filter=" + JSON.stringify(filter)).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {

                this.rowsPaidaccess = data;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }

    setPagePaidaccesswithdraw(offset, limit) {
        var filter = { "where": { "seller_id": this.id }, "limit": limit, "skip": offset * limit }

        this.mainServ.APIServ.get("painAceessWithDraw?filter=" + JSON.stringify(filter)).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {

                this.rowsPaidaccesswithdraw = data;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
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
        console.log(object);
        this.mainServ.APIServ.get('locations/getMyLocations').subscribe(res => {

            this.dialogRef = this.dialog.open(generateCodeComponent, {
                panelClass: 'event-form-dialog',
                width: "500px",
                data: {
                    data: object,
                    locations: res
                }
            });
            this.dialogRef.afterClosed()
        })

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
