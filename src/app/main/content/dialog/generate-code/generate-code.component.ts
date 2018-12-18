import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'generate-code',
    templateUrl: 'generate-code.component.html',
    styleUrls: ['generate-code.component.scss']
})
export class generateCodeComponent {
    codeForm: FormGroup;
    consultant = [];

    loadingIndicator = true

    locations = [];
    sellers;
    object = {}
    currentLocation;
    currentSeller;
    is_sold = true;
    constructor(
        public dialogRef: MatDialogRef<generateCodeComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder

    ) {
        this.locations = data['locations']
        this.object = data['data']
        if (this.object == null) {
            this.codeForm = new FormGroup({
                location_id: new FormControl(this.locations[0].id, Validators.required),
                seller_id: new FormControl('', Validators.required),
                price: new FormControl('', Validators.required),
                used_count: new FormControl('', Validators.required),
                count: new FormControl('', Validators.required),
                is_sold: new FormControl(true, Validators.required)

            });
            this.currentLocation = this.locations[0].id;
            this.getSeller(this.locations[0].id)
        } else if (this.object['price'] != null && this.object['seller_id'] == null) {
            this.codeForm = new FormGroup({
                location_id: new FormControl(this.locations[0].id, Validators.required),
                seller_id: new FormControl('', Validators.required),
                price: new FormControl(this.object['price'], Validators.required),
                used_count: new FormControl(this.object['used_count'], Validators.required),
                count: new FormControl('', Validators.required),
                is_sold: new FormControl(true, Validators.required)

            });
            this.currentLocation = this.locations[0].id;
            this.getSeller(this.locations[0].id)
        }
        else if (this.object['location_id'] != null && this.object['seller_id'] != null && this.object['price'] == null) {
            this.codeForm = new FormGroup({
                location_id: new FormControl(this.object['location_id'], Validators.required),
                seller_id: new FormControl(this.object['seller_id'], Validators.required),
                price: new FormControl("", Validators.required),
                used_count: new FormControl("", Validators.required),
                count: new FormControl('', Validators.required),
                is_sold: new FormControl(true, Validators.required)

            });
            this.currentLocation = this.object['location_id']
            this.currentSeller = this.object['seller_id'];
            console.log(this.currentLocation);
            this.getSeller(this.object['location_id'], this.object['seller_id'])
        }

        else if (this.object['location_id'] != null && this.object['seller_id'] != null && this.object['price'] != null) {
            this.codeForm = new FormGroup({
                location_id: new FormControl(this.object['location_id'], Validators.required),
                seller_id: new FormControl(this.object['seller_id'], Validators.required),
                price: new FormControl(this.object['price'], Validators.required),
                used_count: new FormControl(this.object['used_count'], Validators.required),
                count: new FormControl('', Validators.required),
                is_sold: new FormControl(true, Validators.required)

            });
            this.currentLocation = this.object['location_id']
            this.currentSeller = this.object['seller_id'];
            console.log(this.currentLocation);
            this.getSeller(this.object['location_id'], this.object['seller_id'])
        }


    }

    generate(isExport) {
        var data = this.codeForm.value;
        data['is_sold'] = this.is_sold;
        data['is_export'] = isExport;
        this.mainServ.APIServ.post('locationCode/generate', data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                if (isExport == false)
                    this.dialogRef.close(true)
                else {
                    console.log("data.path")
                    console.log(data.path)
                    var win = window.open(data.path, '_blank');
                    win.focus();
                    this.dialogRef.close(true);
                }
            }
        })

    }

    getSeller(location_id, seller_id: any = null) {
        var filter = { "where": { "location_id": location_id } }
        this.mainServ.APIServ.get('seller?filter=' + JSON.stringify(filter)).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.sellers = data;
                if (seller_id != null) {

                }
                console.log(this.currentSeller);
            }
        })

    }

    ngOnInit() {
    }

    save(isClose) {
        // this.loadingIndicator = false;

        // this.mainServ.APIServ.post('payments', this.codeForm.value).subscribe((data: any) => {
        //     if (this.mainServ.APIServ.getErrorCode() == 0) {
        //         this.loadingIndicator = true;

        //         if (isClose) {
        //             this.dialogRef.close()
        //         }
        //         else {
        //             this.codeForm = new FormGroup({
        //                 partnerId: new FormControl('', Validators.required),
        //                 value: new FormControl('', Validators.required),
        //             });
        //         }
        //     }
        // })

    }
}
