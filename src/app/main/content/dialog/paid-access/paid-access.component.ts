import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'paid-access',
    templateUrl: 'paid-access.component.html',
    styleUrls: ['paid-access.component.scss']
})
export class paidAccessComponent {
    batchForm: FormGroup;
    message
    loadingIndicator = true
    type;
    seller_id
    constructor(
        public dialogRef: MatDialogRef<paidAccessComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder

    ) {
        this.type = data['type']
        this.seller_id = data['seller_id']
        this.batchForm = new FormGroup({
            batch: new FormControl("", Validators.required)
        });
    }





    add(isExport) {
        var data = this.batchForm.value;
        data['seller_id'] = this.seller_id;
        if (this.type != 'add')
            data['batch'] = data['batch'] * -1
        this.mainServ.APIServ.post('painAceessWithDraw', data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.dialogRef.close(true);
            }
            else if (this.mainServ.APIServ.getErrorCode() == 630) {
                this.message = "أصبح رصيد نقطة البيع أقل من الصفر"
                this.mainServ.APIServ.setErrorCode(0)
            }

        })

    }
}
