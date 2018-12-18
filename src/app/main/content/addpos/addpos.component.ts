import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { Component } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Location } from '../../../../../node_modules/@angular/common';


@Component({
    selector: 'fuse-addpos',
    templateUrl: './addpos.component.html',
    styleUrls: ['./addpos.component.scss']
})
export class FuseaddPOSComponent {
    form: FormGroup;
    formErrors: any;
    locations
    constructor(private formBuilder: FormBuilder, private mainServ: MainService, private loc: Location
        , private snack: MatSnackBar) {
        this.formErrors = {
            username: {},
            email: {},
            password: {},
            location_id: {}
        };
    }

    ngOnInit() {

        this.mainServ.APIServ.get('locations/getMyLocations').subscribe(res => {
            this.locations = res;
        })

        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            is_primary: [false],
            location_id: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }


    addPOS() {
        var data = this.form.value;
        this.mainServ.APIServ.post("seller", data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.goTo("pos");
                this.snack.open("أدخلت المعلومات بنجاح", "حسناً")._dismissAfter(2000);

            }
            else if (this.mainServ.APIServ.getErrorCode() == 631) {
                this.snack.open("هذه أول نقطة بيع يجب أن تكون أساسية", "حسناً")._dismissAfter(2000);
                this.mainServ.APIServ.setErrorCode(0)
            }
            else if (this.mainServ.APIServ.getErrorCode() == 632) {
                this.snack.open("يُسمح لك بنقطة بيع واحدة أساسية", "حسناً")._dismissAfter(2000);
                this.mainServ.APIServ.setErrorCode(0)

            }
            else {
                this.mainServ.globalServ.somthingError();
                this.snack.open("الرجاء إدخال المعلومات الصحيحة", "حسناً");
                this.mainServ.APIServ.setErrorCode(0)

            }

        });
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