import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import swal from 'sweetalert2';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'fuse-editadvertising',
    templateUrl: './editadvertising.component.html',
    styleUrls: ['./editadvertising.component.scss']
})
export class FuseeditAdvertisingComponent {
    form: FormGroup;
    formErrors: any;
    imageOnLoad: any = [];
    images1 = [];
    images2 = [];
    text = "";
    errorText = false;
    selectedAccount = "Text"
    ads;
    projects: any[];
    selectedProject: any;
    videos = [];

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
        private mainServ: MainService, private snack : MatSnackBar) {
        this.formErrors = {
            name: {},
            link: {},
            type: {},
            botton_title: {},
        };
    }

    ngOnInit() {
        var id = this.route.snapshot.paramMap.get('id');

        this.form = this.formBuilder.group({
            name: ["", Validators.required],
            link: ["", Validators.required],
            type: ["", Validators.required],
            botton_title: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.mainServ.APIServ.get("ADs/" + id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.ads = data;
                if (this.ads['type'] == "image") {
                    this.images1[0] = {}
                    if (data.media_link != "") {
                        this.images1[0]['file'] = data['media_link'];
                        this.images1[0]['thumbnail'] = data['thumb_link'];
                    }
                    else {this.images1[0] = null}
                    
                    this.images2[0] = {}
                    if (data.portrait_link != "") {
                        this.images2[0]['file'] = data['portrait_link'];
                        this.images2[0]['thumbnail'] = data['portrait_thumb_link'];
                    }
                    else {this.images2[0] = null}
                }
                this.form = this.formBuilder.group({
                    name: [data['name'], Validators.required],
                    link: [data['link'], Validators.required],
                    type: [data['type'], Validators.required],
                    botton_title: [data['botton_title'], Validators.required],
                });

                this.form.valueChanges.subscribe(() => {
                    this.onFormValuesChanged();
                });
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });


    }

    editAds() {
        var data = this.form.value;
        if (data['type'] == "image") {
            if (this.images1[0]['file'] == null) {
                return
            }
            data['media_link'] = this.images1[0]['file'];
            data['thumb_link'] = this.images1[0]['thumbnail'];

            data['portrait_link'] = this.images2[0]['file'];
            data['portrait_thumb_link'] = this.images2[0]['thumbnail'];
        }
        data['partner_id'] = this.mainServ.loginServ.getUserId();
        // console.log(data);
        this.mainServ.APIServ.put("ADs/" + this.ads['id'], data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.goTo("advertising")
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
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


    onChange1(event: any, isImage) {
        if (event.target.files.length == 0) {
            return;
        }
        let files = [].slice.call(event.target.files);
        let allFilles = event.target.files;
        let images: any = [];
        this.imageOnLoad = Array(files.length);
        var innerIndex = 0;
        for (var i = 0; i < allFilles.length; i++) {
            var file = allFilles[i];
            var x;
            console.log("fromOut");
            console.log(i);
        }
        swal({
            title: '..يتم تحميل الصورة',
            allowOutsideClick: false
        });
        swal.showLoading();
        let files2 = Array.from(event.target.files);
        if (isImage)
            var folder = "images"
        else
            var folder = "videos"
        files.forEach((fileElement, index) => {
            let countDelete = 0
            this.images1 = [];
            this.mainServ.APIServ.uploadImage("attachments/" + folder + "/upload", [fileElement], 1).subscribe((data: any) => {
                this.imageOnLoad = [];
                countDelete++;
                if (this.mainServ.APIServ.getErrorCode() == 0)
                    data.forEach(element => {
                        if (isImage) {
                            this.images1.push(element);
                            swal.close();
                        }
                        else
                            this.videos.push(element);

                    });
                else {
                    this.mainServ.globalServ.somthingError()
                    swal.close();
                    this.snack.open("لم يتم تحميل الصورة أو الفيديو الرجاء إعادة المحاولة", "حسناً")
                }

            });
        });
    }

    onChange2(event: any, isImage) {
        if (event.target.files.length == 0) {
            return;
        }
        let files = [].slice.call(event.target.files);
        let allFilles = event.target.files;
        let images: any = [];
        this.imageOnLoad = Array(files.length);
        var innerIndex = 0;
        for (var i = 0; i < allFilles.length; i++) {
            var file = allFilles[i];
            var x;
        }
        swal({
            title: '..يتم تحميل الصورة',
            allowOutsideClick: false
        });
        swal.showLoading();
        let files2 = Array.from(event.target.files);
        var folder = "images"
        files.forEach((fileElement, index) => {
            let countDelete = 0
            this.images2 = [];
            this.mainServ.APIServ.uploadImage("attachments/" + folder + "/upload", [fileElement], 1).subscribe((data: any) => {
                this.imageOnLoad = [];
                countDelete++;
                if (this.mainServ.APIServ.getErrorCode() == 0)
                    data.forEach(element => {
                        if (isImage) {
                            this.images2.push(element);
                            swal.close();
                        }
                    });
                else {
                    this.mainServ.globalServ.somthingError()
                    swal.close();
                    this.snack.open("لم يتم تحميل الصورة أو الفيديو الرجاء إعادة المحاولة", "حسناً")
                }

            });
        });
    }

    openSelectImage(num) {
        if (num == 1) {
            document.getElementById('files1').click();
        }
        if (num == 2) {
            document.getElementById('files2').click();
        }
    }

    /*    releadImage(innerIndex, file) {
           var reader = new FileReader();
           reader.onload = function (e) {
               var id = 'uploadImage' + innerIndex;
               document.getElementById(id).setAttribute('src', reader.result);
               // this.text = reader.result;
           }
           reader.readAsDataURL(file);
       } */


}
