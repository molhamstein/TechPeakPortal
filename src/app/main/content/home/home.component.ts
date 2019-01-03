import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeInterval } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { DatePipe } from '@angular/common';
import { NavigationModel } from '../../../navigation.model';
import { FuseNavigationService } from '../../../core/components/navigation/navigation.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { MatSnackBar } from '@angular/material';
import * as shape from 'd3-shape';
import * as datesBetween from 'dates-between';
import { fuseAnimations } from './../../../core/animations';

@Component({
    selector: 'fuse-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: fuseAnimations
})
export class FusehomeComponent {
    form1: FormGroup;
    navigationModel: NavigationModel;
    compagins = [];
    headLines: any;

    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    refreshTime = 20 * 1000;

    form: FormGroup;
    locations: any = [];
    locationURL = "";

    startDate: any;
    endDate: any;
    dateArray: any = [];
    chartOptions: any = {};

    private onDestroy$ = new Subject<void>();

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private snack: MatSnackBar,
        private mainServ: MainService, private datePipe: DatePipe, private router: Router) {
        // this.navigationModel = new NavigationModel(mainServ);
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
            legendTitle: "",
            yAxisLabel: 'Values',
            scheme: {
                domain: ['#42BFF7', '#e80e0e', '#AAAAAA', '#C6ECFD']
            },
            curve: shape.curveLinear,
            onSelect: (ev) => {
                console.log(ev);
            },
        };
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            location: [''],
        });
        this.form1 = this.formBuilder.group({
            startDate: [''],
            endDate: [''],
        });

        this.mainServ.APIServ.get("locations").subscribe((res: any) => {
            this.locations.push({ name: "ALL", routerName: "" })
            for (let index = 0; index < res.length; index++) {
                this.locations.push(res[index]);
            }
        })

        this.mainServ.APIServ.get("campaigns/states?isActive=true").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.compagins = data;
                for (let index = 0; index < this.compagins.length; index++) {
                    if (this.compagins[index].campaign.completed == 0 && this.compagins[index].campaign.target == 0) {
                        this.compagins[index].current_progress = 0;
                    }
                    else {
                        this.compagins[index].current_progress = (this.compagins[index].campaign.completed / this.compagins[index].campaign.target) * 100;
                    }
                }
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

        this.mainServ.APIServ.get("campaigns/actionStates").subscribe(res => {
            this.headLines = res;
        })

        this.endDate = new Date();
        var year = this.endDate.getFullYear();
        var month = this.endDate.getMonth();
        this.startDate = new Date(year, month - 1, 1);
        this.search();

        this.refresh();

        Observable.interval(this.refreshTime).takeUntil(this.onDestroy$).subscribe(() => this.mainServ.APIServ.get("clients/onlineUsers" + this.locationURL)
            .subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.rows = data;
                    console.log("refresh");
                    for (let index = 0; index < this.rows.length; index++) {
                        this.rows[index].acctstartDate = this.datePipe.transform(this.rows[index].acctstarttime, 'hh:mm a');
                        this.rows[index].acctstarttime = this.datePipe.transform(this.rows[index].acctstarttime, 'yyyy-MM-dd');
                        /* this.rows[index].acctstarttime = this.rows[index].acctstarttime.toLocalTimeString(); */
                    }
                    this.loadingIndicator = true;
                }
                else if (this.mainServ.APIServ.getErrorCode() == 400) {

                }
                else {
                    this.mainServ.globalServ.somthingError();
                }
            }))
    }

    navigate(id) {
        this.router.navigate(['/viewcampaign', id]);
    }

    selectLocation(event) {
        this.locationURL = '?location=' + event.value.routerName;
        this.refresh();
    }

    refresh() {
        this.loadingIndicator = false;
        setTimeout(() => {
            this.mainServ.APIServ.get('clients/onlineUsers' + this.locationURL).subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.rows = data;
                    console.log(this.rows)
                    for (let index = 0; index < this.rows.length; index++) {
                        this.rows[index].acctstartDate = this.datePipe.transform(this.rows[index].acctstarttime, 'hh:mm a', "GMT+00:00");
                        this.rows[index].acctstarttime = this.datePipe.transform(this.rows[index].acctstarttime, 'yyyy-MM-dd');
                    }
                    this.loadingIndicator = true;

                }
                else if (this.mainServ.APIServ.getErrorCode() == 400) {

                }
                else {
                    this.mainServ.globalServ.somthingError();
                }

            });
        }, 100);

    }

    search() {
        if (this.startDate >= this.endDate) {
            this.snack.open("الرجاء التأكد من أن تاريخ البداية أصغر من تاريخ النهاية", "حسناً");
            return;
        }
        debugger
        var seriesArray: any = [];
        var seriesArray2: any=[];
        var sDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
        var eDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
        this.mainServ.APIServ.get('campaigns/graphStates?startDate=' + sDate + '&endDate=' + eDate).subscribe(res => {
            this.dateArray = res;
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
                    seriesArray2.push(this.dateArray[1].series[index]);
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
                        seriesArray2.push(tempObj);
                    }
                }
                this.dateArray[1].series = seriesArray2;
            }
        })
    }

    ngOnDestroy() {
        console.log("out");
        this.onDestroy$.next();
    }


}
