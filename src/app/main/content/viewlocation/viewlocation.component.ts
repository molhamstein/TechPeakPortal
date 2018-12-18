import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { Component } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Location } from '../../../../../node_modules/@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fuse-viewlocation',
    templateUrl: './viewlocation.component.html',
    styleUrls: ['./viewlocation.component.scss']
})
export class FuseviewLocationComponent {
    form: FormGroup;
    formErrors: any;
    id: any;
    viewData: any;
    ispDatum: any;
    typs = [{
        "view": "مجانا",
        "value": "free"
    },
    {
        "view": "الكتروني",
        "value": "automatic"
    },
    {
        "view": "يدوي",
        "value": "manual"
    }
    ]
    type;

    constructor(private formBuilder: FormBuilder, private mainServ: MainService, private loc: Location
        , private route: ActivatedRoute, private snack: MatSnackBar) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [''],
            ip: [''],
            partner: [''],
            routerName: [''],
            dailyLimit: [0],
            user: ['', Validators.required],
            password: ['', Validators.required],
            type: ['', Validators.required],
            port: [22, Validators.required],
            manualActivationPrice: [0, Validators.required],
            isp: []
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.mainServ.APIServ.get('locations/' + this.id + '?filter={"include":["partner"]}').subscribe((res: any) => {
            this.viewData = res;
            this.type = this.typs.find(o => o.value === this.viewData.type);

            if (!this.viewData.partner) {
                this.viewData.partner = { fullname: "" };
            }
            if (this.viewData.isp_id != 0) {
                this.mainServ.APIServ.get('ISP/' + this.viewData.isp_id).subscribe(data => {
                    this.ispDatum = data;
                })
            }
            else {
                this.ispDatum = { username: "لا يوجد" };
            }

        })
    }

    back() {
        this.loc.back();
    }

    onFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

}