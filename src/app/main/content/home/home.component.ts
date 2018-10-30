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

@Component({
    selector: 'fuse-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class FusehomeComponent {
    navigationModel: NavigationModel;
    compagins=[];
    headLines: any;

    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    refreshTime = 20*1000;

    private onDestroy$ = new Subject<void>();

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
        private mainServ: MainService, private datePipe: DatePipe , private router: Router) {
           // this.navigationModel = new NavigationModel(mainServ);
            
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

        Observable.interval(this.refreshTime).takeUntil(this.onDestroy$).subscribe( () => this.mainServ.APIServ.get("clients/onlineUsers")
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

    navigate(id) {
        this.router.navigate(['/viewcampaign', id]);
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

    ngOnDestroy(){
        console.log("out");
        this.onDestroy$.next();
    }


}
