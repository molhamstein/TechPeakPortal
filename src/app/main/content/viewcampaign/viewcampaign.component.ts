import { fuseAnimations } from './../../../core/animations';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import * as shape from 'd3-shape';
import * as datesBetween from 'dates-between';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'fuse-viewcampaign',
    templateUrl: './viewcampaign.component.html',
    styleUrls: ['./viewcampaign.component.scss'],
    animations: fuseAnimations

})
export class FuseviewCampaignComponent implements OnInit {
    form: FormGroup;
    rows = [];
    widgets: any;
    chartOptions: any = {};
    pieOptions: any = {};
    tt: any = [];
    id: any;
    headLines:any;
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;

    startDate: any;
    endDate: any;
    dateArray: any = [];
    pieToggle:any = "clicks";

    pieClicks : any;
    pieImpressions : any;
    showPie: any ;

    mapClicks:any;
    mapImpressions:any;
    showMap:any;
    mapToggle:any = "clicks";

    impressionsClients : any = [];
    clicksClients : any = [];
    lat = 33.51380000000012;
    lng = 36.27649999999994;

    campaign: any

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private datePipe: DatePipe,
             private mainServ: MainService, private snack: MatSnackBar) {

        this.chartOptions = {
            currentRange: '',
            xAxis: true,
            yAxis: true,
            gradient: true,
            legend: true,
            showXAxisLabel: true,
            xAxisLabel: 'Dates',
            showYAxisLabel: true,
            showGridLines: false,
            legendTitle : "",
            yAxisLabel: 'Values',
            scheme: {
                domain: ['#42BFF7', '#e80e0e', '#AAAAAA', '#C6ECFD']
            },
            curve: shape.curveLinear,
            onSelect: (ev) => {
                console.log(ev);
            },
        };

        this.pieOptions = {
            currentRange: '',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#9b28b0', '#02a9f5', '#03a9f4', '#e91e63']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            startDate: ['',],
            endDate: ['',],
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.mainServ.APIServ.get("campaigns/" + this.id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.campaign = data;
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

        this.mainServ.APIServ.get("campaigns/overAllStates?campaignId=" + this.id).subscribe(res => {
            this.headLines = res;
        })

        this.mainServ.APIServ.get("campaigns/genderStates?campaignId=" + this.id).subscribe((res:any) => {
            this.pieClicks = res[0];
            this.pieImpressions = res[1];
            for (let index = 0; index < this.pieClicks.series.length; index++) {

                this.pieClicks.series[index].name = this.pieClicks.series[index].key;
                delete this.pieClicks.series[index].key;
                /* if(this.pieClicks.series[index].name == 'male') {
                    this.pieClicks.series.splice(index , 1);
                } */
                
            }
            for (let index = 0; index < this.pieImpressions.series.length; index++) {
                this.pieImpressions.series[index].name = this.pieImpressions.series[index].key;
                delete this.pieImpressions.series[index].key;
              /*   if(this.pieImpressions.series[index].name == 'male') {
                    this.pieImpressions.series.splice(index , 1);
                } */
                
            }
            this.showPie = this.pieImpressions;
        })

        this.endDate = new Date ();
        var year = this.endDate.getFullYear();
        var month = this.endDate.getMonth();
        this.startDate = new Date (year,month-1,1);
        this.search();

        this.mainServ.APIServ.get("campaigns/locationStates").subscribe((res:any) => {
            this.mapClicks = res[0].series;
            this.mapImpressions = res[1].series;
            this.showMap = this.mapImpressions;
        })

        this.mainServ.APIServ.get('impressions?filter={"where":{"and":[{"campaign_id":' + this.id + '}]}, "include":["location","ad","client"],"limit":10}')
        .subscribe((res:any) => {
            this.impressionsClients = res;
            for (let index = 0; index < this.impressionsClients.length; index++) {
                if( !this.impressionsClients[index].client) {
                    var tempClient = {birthdate: "", email: "" , emailVerified: true , username: "" , 
                            gender: "" , id: this.impressionsClients[index].client_id , mobile: "" , np: "" ,
                            profession: "" , realm: "" } ;
                    this.impressionsClients[index].client = tempClient;
                }
            }
        });

        this.mainServ.APIServ.get('clicks?filter={"where":{"and":[{"campaign_id":' + this.id + '}]}, "include":["location","ad","client"],"limit":10}')
        .subscribe((res:any) => {
            this.clicksClients = res;
        });

    }

    toggleMap(str) {
        if (str == "clicks") {
            this.mapToggle = "clicks";
            this.showMap = this.mapImpressions;
        }
        else {
            this.mapToggle = "impressions";
            this.showMap = this.mapClicks;
        }
    }

    toggle(str) {
        if (str == "clicks") {
            this.pieToggle = "clicks";
            this.showPie = this.pieImpressions;
        }
        else {
            this.pieToggle = "impressions";
            this.showPie = this.pieClicks;
        }
    }

    search() {
        if (this.startDate >= this.endDate) {
            this.snack.open("الرجاء التأكد من أن تاريخ البداية أصغر من تاريخ النهاية", "حسناً");
            return;
        }
        var seriesArray: any = [];
        var sDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
        var eDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
        this.mainServ.APIServ.get('campaigns/graphStates?campaignId=' + this.id + '&startDate=' + sDate + '&endDate=' + eDate).subscribe(res => {
            this.dateArray = res;
            console.log(this.dateArray);
            for (let index = 0; index < this.dateArray[0].series.length; index++) {
                this.dateArray[0].series[index].name = this.dateArray[0].series[index].key;
                delete this.dateArray[0].series[index].key;
            }
            if (this.dateArray[0].series.length != 0) {
                for (let index = 0; index < this.dateArray[0].series.length; index++) {
                    seriesArray.push(this.dateArray[0].series[index]);
                    if (index == this.dateArray[0].series.length - 1) {
                        break;
                    }
                    var start = new Date(this.dateArray[0].series[index].name);
                    var end = new Date(this.dateArray[0].series[index + 1].name);
                    var dates = Array.from(datesBetween(start, end));
                    dates.splice(dates.indexOf(dates[0], 0), 1);
                    dates.splice(dates.indexOf(dates[dates.length - 1], 0), 1);
                    for (let index = 0; index < dates.length; index++) {
                        var tempDate = this.datePipe.transform(dates[index], 'yyyy-MM-dd');
                        var tempObj = { "name": tempDate, "value": 0 };
                        seriesArray.push(tempObj);
                    }
                }
                this.dateArray[0].series = seriesArray;
            }
            for (let index = 0; index < this.dateArray[1].series.length; index++) {
                this.dateArray[1].series[index].name = this.dateArray[1].series[index].key;
                delete this.dateArray[1].series[index].key;
            }
            if (this.dateArray[1].series.length != 0) {
                for (let index = 0; index < this.dateArray[1].series.length; index++) {
                    seriesArray.push(this.dateArray[1].series[index]);
                    if (index == this.dateArray[1].series.length - 1) {
                        break;
                    }
                    var start = new Date(this.dateArray[1].series[index].name);
                    var end = new Date(this.dateArray[1].series[index + 1].name);
                    var dates = Array.from(datesBetween(start, end));
                    dates.splice(dates.indexOf(dates[0], 0), 1);
                    dates.splice(dates.indexOf(dates[dates.length - 1], 0), 1);
                    for (let index = 0; index < dates.length; index++) {
                        var tempDate = this.datePipe.transform(dates[index], 'yyyy-MM-dd');
                        var tempObj = { "name": tempDate, "value": 0 };
                        seriesArray.push(tempObj);
                    }
                }
                this.dateArray[1].series = seriesArray;
            }
        })
    }
}
