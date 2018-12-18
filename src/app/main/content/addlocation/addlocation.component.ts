import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { Component } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Location } from '../../../../../node_modules/@angular/common';


@Component({
    selector: 'fuse-addlocation',
    templateUrl: './addlocation.component.html',
    styleUrls: ['./addlocation.component.scss']
})
export class FuseaddLocationComponent {
    form: FormGroup;
    formErrors: any;

    myControl = new FormControl();
    filteredOptions: Observable<Partners[]>;
    partners: Partners[] = [];
    selectedPartner: any;

    lat = 33.51380000000012;
    lng = 36.27649999999994;
    ISPs: any = [];
    selectedType="free";
    selectedISP: any = { username: "No ISP", id: 0 };

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

    constructor(private formBuilder: FormBuilder, private mainServ: MainService, private loc: Location
        , private snack: MatSnackBar) {
        this.formErrors = {
            name: {},
            ip: {},
            routerName: {},
            user: {},
            password: {},
            port: {},
        };
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            ip: ['', Validators.required],
            routerName: ['', Validators.required],
            user: ['', Validators.required],
            password: ['', Validators.required],
            type: ['', Validators.required],
            port: [22, Validators.required],
            manualActivationPrice: [0, Validators.required],
            dailyLimit: [0],
            isp: []
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.mainServ.APIServ.get("ISP").subscribe((res: any) => {
            this.ISPs = res;
            this.ISPs.push({ username: "No ISP", id: 0 });
        })

        this.mainServ.APIServ.get("partners").subscribe((res: any) => {
            this.partners = res;
            this.filteredOptions = this.myControl.valueChanges
                .pipe(
                startWith<string | Partners>(''),
                map(value => typeof value === 'string' ? value : value.fullname),
                map(title => title ? this._filter(title) : this.partners.slice())
                );
        })
    }

    displayFn(part?: Partners): string | undefined {
        return part ? part.fullname : undefined;
    }

    private _filter(full: string): Partners[] {
        const filterValue = full.toLowerCase();

        return this.partners.filter(part => part.fullname.toLowerCase().indexOf(filterValue) === 0);
    }

    addLocation() {
        var data = this.form.value;
        data.partner_id = this.selectedPartner.id;
        data.lng = this.lng;
        data.lat = this.lat;
        data.isp_id = this.selectedISP.id;
        if (data.partner_id == undefined) {
            this.snack.open("الرجاء إدخال اسم المستخدم الصحيح", "حسناً");
            return;
        }
        delete data.isp;
        this.mainServ.APIServ.post("locations", data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.goTo("locations");
                this.snack.open("أدخلت المعلومات بنجاح", "حسناً")._dismissAfter(2000);
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
                this.snack.open("الرجاء إدخال المعلومات الصحيحة", "حسناً");
            }

        });
    }

    markerDragEnd($event) {
        this.lat = $event.coords.lat;
        console.log(this.lat);
        this.lng = $event.coords.lng;
        console.log(this.lng);
    }

    markerPosition(event) {
        this.lat = event.coords.lat;
        console.log(this.lat);
        this.lng = event.coords.lng;
        console.log(this.lng);
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

export interface Partners {
    fullname: string;
    id: number;
}