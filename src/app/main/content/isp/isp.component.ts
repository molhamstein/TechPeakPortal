import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'fuse-isp',
    templateUrl: './isp.component.html',
    styleUrls: ['./isp.component.scss']
})
export class FuseISPComponent implements OnInit {
    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    constructor(private http: HttpClient, private translationLoader: FuseTranslationLoaderService,
         private mainServ: MainService, private snack : MatSnackBar) {
        this.translationLoader.loadTranslations(english, turkish);
    }
    ngOnInit() {
        this.mainServ.APIServ.get('ISP').subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.rows = data;
                this.loadingIndicator = true;
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }

    addISP() {
        this.mainServ.globalServ.goTo("addisp")
    }

    edit(id) {
        this.mainServ.globalServ.goTo("editisp/" + id)
    }

    delete(id) {
        this.mainServ.APIServ.delete("ISP/" + id).subscribe(() => {
            this.mainServ.APIServ.get('ISP').subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.rows = data;
                    this.loadingIndicator = true;
                }
                else if (this.mainServ.APIServ.getErrorCode() == 400) {
    
                }
                else {
                    this.mainServ.globalServ.somthingError();
                }
    
            });
        }, 
        err => {this.snack.open("هنالك أمر خاطئ يرجى إعادة المحالة", "حسناً")})
    }

    deleteModal(id) {
        swal({
            title: 'هل أنت منأكد؟',
            text: "! لا يمكن النراجع عن الحذف",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText:"إلغاء",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، أريد الحذف'
        }).then((result) => {
            if (result.value) {
                this.delete(id);
                swal(
                    '! تم الحذف',
                    'لقد تم حذف العنصر',
                    'success'
                )
            }
        })
    }

}
