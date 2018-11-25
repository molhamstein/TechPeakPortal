import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import swal from 'sweetalert2';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'my-dialog',
    templateUrl: './my-dialog.component.html',
    styleUrls: ['./my-dialog.component.scss']
})
export class myDialogComponent implements OnInit {
    form : FormGroup;
    status:any;
    view_impressions:any;
    constructor( private translationLoader: FuseTranslationLoaderService, 
        private mainServ: MainService, private dialog: MatDialog, private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<myDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {
            this.status = data.status;
            this.view_impressions = data.view_impressions;
        this.translationLoader.loadTranslations(english, turkish);
    }
    ngOnInit() {

        this.form = this.formBuilder.group({
            status: [''],
            view_impressions: [''],

        });
    }
    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
