import { MainService } from './../../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';

@Component({
    selector: 'fuse-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: fuseAnimations
})
export class FuseForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private mainServ: MainService
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.forgotPasswordFormErrors = {
            email: {}
        };
    }

    ngOnInit() {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });
    }

    onForgotPasswordFormValuesChanged() {
        for (const field in this.forgotPasswordFormErrors) {
            if (!this.forgotPasswordFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordFormErrors.get(field);

            if (control && control.dirty && !control.valid) {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }



    message = " ";
    sendEmail() {
        this.mainServ.APIServ.post("partners/reset", this.forgotPasswordForm.value).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.message = ". الرجاء الإطلاع على بريدك الالكتروني "
            }
            else {
                this.message = ". الرجاء المحاولة مرة أخرى "
                this.mainServ.APIServ.setErrorCode(0);
            }

        });
    }

}
