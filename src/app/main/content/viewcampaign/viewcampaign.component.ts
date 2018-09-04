import { fuseAnimations } from './../../../core/animations';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'fuse-viewcampaign',
    templateUrl: './viewcampaign.component.html',
    styleUrls: ['./viewcampaign.component.scss'],
    animations: fuseAnimations

})
export class FuseviewCampaignComponent implements OnInit {
    rows = [];
    widgets: any;
    widget6: any = {};

    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;
    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private translationLoader: FuseTranslationLoaderService, private mainServ: MainService) {
        this.widget6 = {
            currentRange: 'TW',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

    }

    lat = -34.397;
    lng = 150.644;

    campaign: any




    ngOnInit() {

        var id = this.route.snapshot.paramMap.get('id');

        this.mainServ.APIServ.get("campaigns/" + id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.campaign = data;
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });


        this.widgets = {
            'widget6': {
                'title': 'Task Distribution',
                'ranges': {
                    'TW': 'This Week',
                    'LW': 'Last Week',
                    '2W': '2 Weeks Ago'
                },
                'mainChart': {
                    'TW': [
                        {
                            'name': 'Frontend',
                            'value': 80
                        },
                        {
                            'name': 'Backend',
                            'value': 20
                        }
                    ],
                    'LW': [
                        {
                            'name': 'Frontend',
                            'value': 80
                        },
                        {
                            'name': 'Backend',
                            'value': 20
                        }                    ],
                    '2W': [
                        {
                            'name': 'Frontend',
                            'value': 80
                        },
                        {
                            'name': 'Backend',
                            'value': 20
                        }
                    ]
                },
                'footerLeft': {
                    'title': 'الذكور',
                    'count': {
                        '2W': 487,
                        'LW': 526,
                        'TW': 594
                    }
                },
                'footerRight': {
                    'title': 'الإناث',
                    'count': {
                        '2W': 193,
                        'LW': 260,
                        'TW': 287
                    }
                }
            }
        };
    }
}
