import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { Component } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Location } from '../../../../../node_modules/@angular/common';


@Component({
    selector: 'fuse-addisp',
    templateUrl: './addisp.component.html',
    styleUrls: ['./addisp.component.scss']
})
export class FuseaddISPComponent {
    form: FormGroup;
    formErrors: any;

    constructor(private formBuilder: FormBuilder, private mainServ: MainService, private loc: Location
        , private snack: MatSnackBar) {
        this.formErrors = {
            username: {},
            email: {},
            password:{}
        };
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            emailVerified:[false],
            password:['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }


    addISP() {
        var data = this.form.value;
        this.mainServ.APIServ.post("ISP", data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.goTo("isp");
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