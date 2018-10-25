import { fuseAnimations } from './../../../core/animations';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import * as shape from 'd3-shape';
import * as datesBetween from 'dates-between';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'fuse-viewcampaign',
    templateUrl: './viewcampaign.component.html',
    styleUrls: ['./viewcampaign.component.scss'],
    animations: fuseAnimations

})
export class FuseviewCampaignComponent implements OnInit {
    form: FormGroup;
    rows = [];
    widgets: any;
    chartOptions: any = {};
    pieOptions: any = {};
    tt: any = [];
    id: any;
    headLines:any;
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;

    startDate: any;
    endDate: any;
    dateArray: any = [];
    pieToggle:any = "clicks";

    pieClicks : any;
    pieImpressions : any;
    showPie: any ;

    mapClicks:any;
    mapImpressions:any;
    showMap:any;
    mapToggle:any = "clicks";

    impressionsClients : any = [];
    clicksClients : any = [];
    lat = -34.397;
    lng = 150.644;

    campaign: any

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private datePipe: DatePipe,
             private mainServ: MainService, private snack: MatSnackBar) {

        this.chartOptions = {
            currentRange: '',
            xAxis: true,
            yAxis: true,
            gradient: true,
            legend: true,
            showXAxisLabel: true,
            xAxisLabel: 'Dates',
            showYAxisLabel: true,
            showGridLines: false,
            legendTitle : "",
            yAxisLabel: 'Values',
            scheme: {
                domain: ['#42BFF7', '#e80e0e', '#AAAAAA', '#C6ECFD']
            },
            curve: shape.curveLinear,
            onSelect: (ev) => {
                console.log(ev);
            },
        };

        this.pieOptions = {
            currentRange: '',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#9b28b0', '#02a9f5', '#03a9f4', '#e91e63']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            startDate: ['',],
            endDate: ['',],
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.mainServ.APIServ.get("campaigns/" + this.id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.campaign = data;
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

        this.mainServ.APIServ.get("campaigns/overAllStates?campaignId=" + this.id).subscribe(res => {
            this.headLines = res;
        })

        this.mainServ.APIServ.get("campaigns/genderStates").subscribe((res:any) => {
            this.pieClicks = res[0];
            this.pieImpressions = res[1];
            for (let index = 0; index < this.pieClicks.series.length; index++) {
                if(this.pieClicks.series[index].key == 'male') {
                    this.pieClicks.series.splice(index , 1);
                }
                this.pieClicks.series[index].name = this.pieClicks.series[index].key;
                delete this.pieClicks.series[index].key;
            }
            for (let index = 0; index < this.pieImpressions.series.length; index++) {
                if(this.pieImpressions.series[index].key == 'male') {
                    this.pieImpressions.series.splice(index , 1);
                }
                this.pieImpressions.series[index].name = this.pieImpressions.series[index].key;
                delete this.pieImpressions.series[index].key;
            }
            this.showPie = this.pieImpressions;
        })

        this.mainServ.APIServ.get("campaigns/locationStates").subscribe((res:any) => {
            this.mapClicks = res[0].series;
            this.mapImpressions = res[1].series;
        })

        this.mainServ.APIServ.get('impressions?filter={"where":{"and":[{"campaign_id":' + this.id + '}]}, "include":["location","ad","client"],"limit":10}')
        .subscribe((res:any) => {
            this.impressionsClients = res;
        });

        this.mainServ.APIServ.get('clicks?filter={"where":{"and":[{"campaign_id":' + this.id + '}]}, "include":["location","ad","client"],"limit":10}')
        .subscribe((res:any) => {
            this.clicksClients = res;

        });

        /* this.widgets = {
            'widget5': {
                'title': 'Statistics',
                'ranges': {
                    'TW': 'This Week',
                    'LW': 'Last Week',
                    '2W': '2 Weeks Ago'
                },
                'mainChart': {
                    '2W': [
                        {
                            'name': 'Mon',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 37
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 9
                                }
                            ]
                        },
                        {
                            'name': 'Tue',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 32
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 12
                                }
                            ]
                        },
                        {
                            'name': 'Wed',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 39
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 9
                                }
                            ]
                        },
                        {
                            'name': 'Thu',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 27
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 12
                                }
                            ]
                        },
                        {
                            'name': 'Fri',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 18
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 7
                                }
                            ]
                        },
                        {
                            'name': 'Sat',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 24
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 8
                                }
                            ]
                        },
                        {
                            'name': 'Sun',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 20
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 16
                                }
                            ]
                        }
                    ],
                    'LW': [
                        {
                            'name': 'Mon',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 37
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 12
                                }
                            ]
                        },
                        {
                            'name': 'Tue',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 24
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 8
                                }
                            ]
                        },
                        {
                            'name': 'Wed',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 51
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 7
                                }
                            ]
                        },
                        {
                            'name': 'Thu',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 31
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 13
                                }
                            ]
                        },
                        {
                            'name': 'Fri',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 29
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 7
                                }
                            ]
                        },
                        {
                            'name': 'Sat',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 17
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 6
                                }
                            ]
                        },
                        {
                            'name': 'Sun',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 31
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 10
                                }
                            ]
                        }
                    ],
                    'TW': [
                        {
                            'name': 'Mon',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 42
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 11
                                }
                            ]
                        },
                        {
                            'name': 'Tue',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 28
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 10
                                }
                            ]
                        },
                        {
                            'name': 'Wed',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 43
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 8
                                }
                            ]
                        },
                        {
                            'name': 'Thu',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 34
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 11
                                }
                            ]
                        },
                        {
                            'name': 'Fri',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 20
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 8
                                }
                            ]
                        },
                        {
                            'name': 'Sat',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 25
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 10
                                }
                            ]
                        },
                        {
                            'name': 'Sun',
                            'series': [
                                {
                                    'name': 'issues',
                                    'value': 22
                                },
                                {
                                    'name': 'closed issues',
                                    'value': 17
                                }
                            ]
                        }
                    ]
                },
                'supporting': {
                    'created': {
                        'label': 'CREATED',
                        'count': {
                            '2W': 48,
                            'LW': 46,
                            'TW': 54
                        },
                        'chart': {
                            '2W': [
                                {
                                    'name': 'CREATED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ],
                            'LW': [
                                {
                                    'name': 'Created',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ],
                            'TW': [
                                {
                                    'name': 'Created',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 2
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 1
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 4
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    'closed': {
                        'label': 'CLOSED',
                        'count': {
                            '2W': 27,
                            'LW': 31,
                            'TW': 26
                        },
                        'chart': {
                            '2W': [
                                {
                                    'name': 'CLOSED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 2
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 1
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 4
                                        }
                                    ]
                                }
                            ],
                            'LW': [
                                {
                                    'name': 'CLOSED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ],
                            'TW': [
                                {
                                    'name': 'CLOSED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    'reOpened': {
                        'label': 'RE-OPENED',
                        'count': {
                            '2W': 4,
                            'LW': 5,
                            'TW': 2
                        },
                        'chart': {
                            '2W': [
                                {
                                    'name': 'RE-OPENED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ],
                            'LW': [
                                {
                                    'name': 'RE-OPENED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 1
                                        }
                                    ]
                                }
                            ],
                            'TW': [
                                {
                                    'name': 'RE-OPENED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 2
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 1
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 4
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    'wontFix': {
                        'label': 'WON\'T FIX',
                        'count': {
                            '2W': 6,
                            'LW': 3,
                            'TW': 4
                        },
                        'chart': {
                            '2W': [
                                {
                                    'name': 'WON\'T FIX',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 2
                                        }
                                    ]
                                }
                            ],
                            'LW': [
                                {
                                    'name': 'WON\'T FIX',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ],
                            'TW': [
                                {
                                    'name': 'WON\'T FIX',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    'needsTest': {
                        'label': 'NEEDS TEST',
                        'count': {
                            '2W': 10,
                            'LW': 7,
                            'TW': 8
                        },
                        'chart': {
                            '2W': [
                                {
                                    'name': 'NEEDS TEST',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ],
                            'LW': [
                                {
                                    'name': 'NEEDS TEST',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 1
                                        }
                                    ]
                                }
                            ],
                            'TW': [
                                {
                                    'name': 'NEEDS TEST',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    'fixed': {
                        'label': 'FIXED',
                        'count': {
                            '2W': 21,
                            'LW': 17,
                            'TW': 14
                        },
                        'chart': {
                            '2W': [
                                {
                                    'name': 'FIXED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 8
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 1
                                        }
                                    ]
                                }
                            ],
                            'LW': [
                                {
                                    'name': 'FIXED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 7
                                        }
                                    ]
                                }
                            ],
                            'TW': [
                                {
                                    'name': 'FIXED',
                                    'series': [
                                        {
                                            'name': 'Mon',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Tue',
                                            'value': 7
                                        },
                                        {
                                            'name': 'Wed',
                                            'value': 4
                                        },
                                        {
                                            'name': 'Thu',
                                            'value': 6
                                        },
                                        {
                                            'name': 'Fri',
                                            'value': 5
                                        },
                                        {
                                            'name': 'Sat',
                                            'value': 3
                                        },
                                        {
                                            'name': 'Sun',
                                            'value': 2
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
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
                        }],
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

        }; */

        /* this.tt = [
            {
                "name": "Brunei Darussalam",
                "series": [
                    {
                        "value": 2336,
                        "name": "2016-09-24T06:06:17.294Z"
                    },
                    {
                        "value": 6246,
                        "name": "2016-09-24T00:55:31.489Z"
                    },
                    {
                        "value": 6500,
                        "name": "2016-09-21T20:27:12.454Z"
                    },
                    {
                        "value": 4017,
                        "name": "2016-09-14T17:58:59.381Z"
                    },
                    {
                        "value": 5722,
                        "name": "2016-09-15T12:32:26.800Z"
                    }
                ]
            },
            {
                "name": "Côte D'Ivoire",
                "series": [
                    {
                        "value": 6824,
                        "name": "2016-09-24T06:06:17.294Z"
                    },
                    {
                        "value": 6100,
                        "name": "2016-09-24T00:55:31.489Z"
                    },
                    {
                        "value": 3504,
                        "name": "2016-09-21T20:27:12.454Z"
                    },
                    {
                        "value": 4619,
                        "name": "2016-09-14T17:58:59.381Z"
                    },
                    {
                        "value": 6007,
                        "name": "2016-09-15T12:32:26.800Z"
                    }
                ]
            },
        ] */
    }

    toggleMap(str) {
        if (str == "clicks") {
            this.mapToggle = "clicks";
            this.showMap = this.mapImpressions;
            console.log(this.showMap);
        }
        else {
            this.mapToggle = "impressions";
            this.showMap = this.mapClicks;
            console.log(this.showMap);
        }
    }

    toggle(str) {
        if (str == "clicks") {
            this.pieToggle = "clicks";
            this.showPie = this.pieImpressions;
            console.log(this.showPie);
        }
        else {
            this.pieToggle = "impressions";
            this.showPie = this.pieClicks;
            console.log(this.showPie);
        }
    }

    search() {
        if (this.startDate >= this.endDate) {
            this.snack.open("الرجاء التأكد من أن تاريخ البداية أصغر من تاريخ النهاية", "حسناً");
            return;
        }
        var seriesArray: any = [];
        var sDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
        var eDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
        this.mainServ.APIServ.get('campaigns/graphStates?campaignId=' + this.id + '&startDate=' + sDate + '&endDate=' + eDate).subscribe(res => {
            this.dateArray = res;
            for (let index = 0; index < this.dateArray[0].series.length; index++) {
                this.dateArray[0].series[index].name = this.dateArray[0].series[index].key;
                delete this.dateArray[0].series[index].key;
            }
            if (this.dateArray[0].series.length != 0) {
                for (let index = 0; index < this.dateArray[0].series.length; index++) {
                    seriesArray.push(this.dateArray[0].series[index]);
                    if (index == this.dateArray[0].series.length - 1) {
                        break;
                    }
                    var start = new Date(this.dateArray[0].series[index].name);
                    var end = new Date(this.dateArray[0].series[index + 1].name);
                    var dates = Array.from(datesBetween(start, end));
                    dates.splice(dates.indexOf(dates[0], 0), 1);
                    dates.splice(dates.indexOf(dates[dates.length - 1], 0), 1);
                    for (let index = 0; index < dates.length; index++) {
                        var tempDate = this.datePipe.transform(dates[index], 'yyyy-MM-dd');
                        var tempObj = { "name": tempDate, "value": 0 };
                        seriesArray.push(tempObj);
                    }
                }
                this.dateArray[0].series = seriesArray;
            }
            if (this.dateArray[1].series.length != 0) {
                for (let index = 0; index < this.dateArray[1].series.length; index++) {
                    seriesArray.push(this.dateArray[1].series[index]);
                    if (index == this.dateArray[1].series.length - 1) {
                        break;
                    }
                    var start = new Date(this.dateArray[1].series[index].name);
                    var end = new Date(this.dateArray[1].series[index + 1].name);
                    var dates = Array.from(datesBetween(start, end));
                    dates.splice(dates.indexOf(dates[0], 0), 1);
                    dates.splice(dates.indexOf(dates[dates.length - 1], 0), 1);
                    for (let index = 0; index < dates.length; index++) {
                        var tempDate = this.datePipe.transform(dates[index], 'yyyy-MM-dd');
                        var tempObj = { "name": tempDate, "value": 0 };
                        seriesArray.push(tempObj);
                    }
                }
                this.dateArray[1].series = seriesArray;
            }
        })
    }
}
