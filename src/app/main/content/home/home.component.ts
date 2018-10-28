import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeInterval } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'fuse-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class FusehomeComponent {

    compagins=[];
    headLines: any;

    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    refreshTime = 20*1000;

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
        private mainServ: MainService, private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.mainServ.APIServ.get("campaigns/states?").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.compagins = data;
                for (let index = 0; index < this.compagins.length; index++) {
                    this.compagins[index].current_progress = this.compagins[index].current_progress / 100;                     
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

      this.refresh();

        Observable.interval(this.refreshTime).subscribe( () => this.mainServ.APIServ.get("clients/onlineUsers")
        .subscribe((data:any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rows = data;
                for (let index = 0; index < this.rows.length; index++) {
                    this.rows[index].acctstartDate = this.datePipe.transform(this.rows[index].acctstarttime, 'hh:mm a');
                    this.rows[index].acctstarttime = this.datePipe.transform(this.rows[index].acctstarttime, 'yyyy-MM-dd');
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


    refresh() {
        this.loadingIndicator = false;
        setTimeout(() => {
            this.mainServ.APIServ.get("clients/onlineUsers").subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.rows = data;
                    for (let index = 0; index < this.rows.length; index++) {
                        this.rows[index].acctstartDate = this.datePipe.transform(this.rows[index].acctstarttime, 'hh:mm a');
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



}
