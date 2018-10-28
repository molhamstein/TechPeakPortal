import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'add-payments',
    templateUrl: 'add-payments.component.html',
    styleUrls: ['add-payments.component.scss']
})
export class AddPaymentsComponent {
    paymentForm: FormGroup;
    consultant = [];

    loadingIndicator = true

    type = "";
    partners = [];
    payment;
    constructor(
        public dialogRef: MatDialogRef<AddPaymentsComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder

    ) {
        this.partners = data['partners'];
        this.type = data['type']
        if (data['type'] == "edit") {
            this.payment = data['payment']
            this.paymentForm = new FormGroup({
                partner_id: new FormControl(this.payment.partner_id, Validators.required),
                value: new FormControl(this.payment.value, Validators.required),
            });
            console.log(this.paymentForm);

        } else {
            this.paymentForm = new FormGroup({
                partner_id: new FormControl('', Validators.required),
                value: new FormControl('', Validators.required),
            });

        }

    }
    ngOnInit() {
    }

    save(isClose) {
        this.loadingIndicator = false;

        this.mainServ.APIServ.post('payments', this.paymentForm.value).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.loadingIndicator = true;

                if (isClose) {
                    this.dialogRef.close()
                }
                else {
                    this.paymentForm = new FormGroup({
                        partnerId: new FormControl('', Validators.required),
                        value: new FormControl('', Validators.required),
                    });
                }
            }
        })

    }
    edit() {
        this.loadingIndicator = false;

        this.mainServ.APIServ.put('payments/' + this.payment.id, this.paymentForm.value).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0)
                this.loadingIndicator = true;
            this.dialogRef.close()
        })

    }


}
