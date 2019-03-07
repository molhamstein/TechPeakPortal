import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { Component } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Location } from '../../../../../node_modules/@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fuse-editlocation',
    templateUrl: './editlocation.component.html',
    styleUrls: ['./editlocation.component.scss']
})
export class FuseeditLocationComponent {
    form: FormGroup;
    formErrors: any;
    id: any;
    myControl = new FormControl();
    filteredOptions: Observable<Partners[]>;
    partners: Partners[] = [];
    selectedPartner: any;
    editedData: any;
    city = []
    lat = 33.51380000000012;
    lng = 36.27649999999994;
    ISPs: any = [];
    selectedISP: any;
    type;
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
        , private route: ActivatedRoute, private snack: MatSnackBar) {
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
            dailyLimit: [0],
            user: ['', Validators.required],
            cityId: ['', Validators.required],
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

        this.mainServ.APIServ.get("cities").subscribe((res: any) => {
            this.city = res;
            // this.ISPs.push({ username: "No ISP", id: 0 });
        })

        this.mainServ.APIServ.get('locations/' + this.id + '?filter={"include":["partner"]}').subscribe((res: any) => {
            this.editedData = res;
            this.selectedPartner = this.editedData.partner;
            this.lng = this.editedData.lng;
            this.lat = this.editedData.lat;
            this.type = this.typs.find(o => o.value === this.editedData.type);

            this.mainServ.APIServ.get("ISP").subscribe((res: any) => {
                this.ISPs = res;
                this.ISPs.push({ username: "No ISP", id: 0 });
                for (let index = 0; index < this.ISPs.length; index++) {
                    if (this.ISPs[index].id == this.editedData.isp_id) {
                        this.selectedISP = this.ISPs[index];
                    }
                }
            })
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

    editLocation() {
        var data = this.form.value;
        data.id = this.id;
        data.partner_id = this.selectedPartner.id;
        data.lng = this.lng;
        data.lat = this.lat;
        data.isp_id = this.selectedISP.id;
        if (data.partner_id == undefined) {
            this.snack.open("الرجاء إدخال اسم المستخدم الصحيح", "حسناً");
            return;
        }
        delete data.isp;
        this.mainServ.APIServ.put("locations", data).subscribe((data: any) => {
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
        this.editedData.lat = $event.coords.lat;
        console.log(this.editedData.lat);
        this.lng = $event.coords.lng;
        this.editedData.lng = $event.coords.lng;
        console.log(this.editedData.lng);
    }

    markerPosition(event) {
        this.lat = event.coords.lat;
        this.editedData.lat = event.coords.lat;

        this.lng = event.coords.lng;
        this.editedData.lng = event.coords.lng;
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