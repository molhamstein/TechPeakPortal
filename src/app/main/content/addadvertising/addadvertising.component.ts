import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'fuse-addadvertising',
    templateUrl: './addadvertising.component.html',
    styleUrls: ['./addadvertising.component.scss']
})
export class FuseaddAdvertisingComponent {
    form: FormGroup;
    formErrors: any;
    imageOnLoad: any = [];
    images  = [];
    videos  = [];
   
    ad_text = "";
    errorText = false;
    selectedAccount = "Text"

    projects: any[];
    selectedProject: any;



    constructor(private formBuilder: FormBuilder, private mainServ: MainService) {
        this.formErrors = {
            name: {},
            link: {},
            type: {},
        };



    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            link: ['', Validators.required],
            type: ['Image', Validators.required],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    addAds() {
        var data = this.form.value;
        if (data['type'] == "Image") {
            if (this.images[0]['file'] == null) {
                return
            }
            data['media_link'] = this.images[0]['file'];
            data['thumb_link'] = this.images[0]['thumbnail'];

        } else {
            if (data['type'] == "Text") {
                if (this.ad_text == "") {
                    this.errorText = true;
                    return
                }
                data['ad_text'] = this.ad_text
            }
        }
        data['partner_id'] = this.mainServ.loginServ.getUserId();
        // console.log(data);
        this.mainServ.APIServ.post("ADs", data).subscribe((data: any) => {
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


    onChange(event: any, isImage) {
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
            // this.releadImage(i, file);
        }
        let files2 = Array.from(event.target.files);
        if (isImage)
            var folder = "images"
        else
            var folder = "videos"
        files.forEach((fileElement, index) => {
            let countDelete = 0
            this.images = [];
            // this.ng2ImgMaxService.compress([fileElement], 0.5, true, true).subscribe((result) => {
            this.mainServ.APIServ.uploadImage("attachments/" + folder + "/upload", [fileElement], 1).subscribe((data: any) => {
                this.imageOnLoad = [];
                countDelete++;
                if (this.mainServ.APIServ.getErrorCode() == 0)
                    data.forEach(element => {
                        if (isImage)
                            this.images.push(element);
                        else
                            this.videos.push(element);

                    });
                else
                    this.mainServ.globalServ.somthingError()
            });
        });
        // });
    }

    openSelectImage() {
        document.getElementById('files').click();
    }

    openSelectVideo() {
        document.getElementById('videos').click();
    }

    releadImage(innerIndex, file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var id = 'uploadImage' + innerIndex;
            document.getElementById(id).setAttribute('src', reader.result);
            // this.text = reader.result;
        }
        reader.readAsDataURL(file);
    }


}
