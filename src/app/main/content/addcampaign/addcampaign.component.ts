import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { Component } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'fuse-addcampaign',
    templateUrl: './addcampaign.component.html',
    styleUrls: ['./addcampaign.component.scss']
})
export class FuseaddCampaignComponent {
    form: FormGroup;
    formErrors: any;
    CPC = 100;
    CPI = 50;

    rows = [];
    loadingIndicator = false;
    reorderable = true;
    allRowsSelected: any;

    displayedColumns = ['criteria', 'data', 'cpi', 'cpc', 'icons'];
    dataSource = new MatTableDataSource<Criterias>([]);
    myData: Criterias[] = [];
    newCriteria: any = {};

    myControl = new FormControl();
    filteredOptions: Observable<Partners[]>;
    partners: Partners[] = [];
    selectedPartner: any;

    myControl1 = new FormControl();
    filteredOptions1: Observable<Locations[]>;
    locations: Locations[] = [];
    selectedLocation: any;

    criteriaTypes: any = [];
    selectedCriteria: any = {};
    genders: any = [{ name: "Male" }, { name: "Female" }];
    selectedGender: any;
    professions: any = [{ name: "الإداره و خدمات الدعم الاداري" }, { name: "النقل و الحدمات اللوجستيه" }, { name: "الخدمات الاجتماعيه" },
    { name: "الإعلام و الإعلان" }, { name: "المبيعات و التسويق" }, { name: "الصناعه و التصنيع" }, { name: "الخدمات الطبية و العلوم" },
    { name: "الطاقة و النفط و الغاز" }, { name: "الفنادق و المطاعم" }, { name: "التشييد و العقارات" }, { name: "البنوك و الصرفة" },
    { name: "التكنولوجيا و الاتصالات" }, { name: "المحاسبة" }, { name: "التعليم" }, { name: "الفنون و التصميم" }, { name: "الخدمات القانونية" },
    { name: "المهن اليدويه و الحرفية" }, { name: "طالب" }];
    selectedProfession: any;
    fromAge: any;
    toAge: any;

    genderIndex: number;
    ageIndex: number;
    genderObject: any;
    ageObject: any;

    adsIds: any = [];
    sendCriteriaFromAge: any;
    sendCriteriaToAge: any;

    isAdmin = true;
    role: any;
    id: any;

    constructor(private formBuilder: FormBuilder, private mainServ: MainService, private snack: MatSnackBar) {
        this.formErrors = {
            name: {},
            type: {},
            expiration_date: {},
            start: {},
            status: {},
            target: {}
        };
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            status: ['', Validators.required],
            expiration_date: ['', Validators.required],
            target: ['', Validators.required],
            start: ['', Validators.required],
            criteriaType: [''],
            location: [''],
            gender: [''],
            fromAge: [''],
            toAge: [''],
            profession: [''],
            view_impressions:[false],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.role = this.mainServ.loginServ.getRole();
        if (this.role == "partner") {
            this.id = this.mainServ.loginServ.getUserId();
            this.isAdmin = false;
            this.formErrors = {
                name: {},
                type: {},
                expiration_date: {},
                start: {},
                target: {}
            };
            this.form = this.formBuilder.group({
                name: ['', Validators.required],
                type: ['', Validators.required],
                expiration_date: ['', Validators.required],
                target: ['', Validators.required],
                start: ['', Validators.required],
                partner: [''],
                criteriaType: [''],
                location: [''],
                gender: [''],
                fromAge: [''],
                toAge: [''],
                profession: [''],
            });

            this.mainServ.APIServ.get('ADs').subscribe((res: any) => {
                this.rows = res;
                for (let index = 0; index < this.rows.length; index++) {
                    this.rows[index].checked = false;
                }
                this.loadingIndicator = true;
            })

            this.mainServ.APIServ.get("criteria_prices").subscribe(res => {
                this.criteriaTypes = res;
                for (let index = 0; index < this.criteriaTypes.length; index++) {
                    if (this.criteriaTypes[index].type == "default") {
                        this.CPC = this.criteriaTypes[index].perClick;
                        this.CPI = this.criteriaTypes[index].perImp;
                        this.criteriaTypes.splice(this.criteriaTypes.indexOf(this.criteriaTypes[index], 0), 1);
                    }
                }
            })
            this.mainServ.APIServ.get("partners/" + this.id).subscribe((res: any) => {
                this.selectedPartner = res;
            })
        }
        else {
            this.mainServ.APIServ.get('ADs').subscribe((res: any) => {
                this.rows = res;
                for (let index = 0; index < this.rows.length; index++) {
                    this.rows[index].checked = false;
                }
                this.loadingIndicator = true;
            })

            this.mainServ.APIServ.get("criteria_prices").subscribe(res => {
                this.criteriaTypes = res;
                for (let index = 0; index < this.criteriaTypes.length; index++) {
                    if (this.criteriaTypes[index].type == "default") {
                        this.CPC = this.criteriaTypes[index].perClick;
                        this.CPI = this.criteriaTypes[index].perImp;
                        this.criteriaTypes.splice(this.criteriaTypes.indexOf(this.criteriaTypes[index], 0), 1);
                    }
                }
            })

            this.mainServ.APIServ.get("partners").subscribe((res: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 401 || res == "E") {
                    this.snack.open("هنالك مشكلة ما.. الرجاء المحاولة لاحقاً", "حسناً");
                    /*  this.mainServ.globalServ.goTo("campaign"); */
                }
                else {
                    this.partners = res;
                    this.filteredOptions = this.myControl.valueChanges
                        .pipe(
                            startWith<string | Partners>(''),
                            map(value => typeof value === 'string' ? value : value.fullname),
                            map(title => title ? this._filter(title) : this.partners.slice())
                        );
                }
            }, err => { this.mainServ.globalServ.goTo("campaign"); })

        }
    }

    displayFn(part?: Partners): string | undefined {
        return part ? part.fullname : undefined;
    }

    private _filter(full: string): Partners[] {
        const filterValue = full.toLowerCase();

        return this.partners.filter(part => part.fullname.toLowerCase().indexOf(filterValue) === 0);
    }

    displayLoc(part?: Locations): string | undefined {
        return part ? part.name : undefined;
    }

    private _filterLoc(name: string): Locations[] {
        const filterValue = name.toLowerCase();

        return this.locations.filter(part => part.name.toLowerCase().indexOf(filterValue) === 0);
    }

    criteriaSelectChange() {
        if (this.selectedCriteria.type == "location") {
            this.selectedGender = "";
            this.fromAge = "";
            this.toAge = "";
            this.selectedProfession = "";
            this.mainServ.APIServ.get("locations").subscribe((res: any) => {
                this.locations = res;
                this.filteredOptions1 = this.myControl1.valueChanges
                    .pipe(
                        startWith<string | Locations>(''),
                        map(value => typeof value === 'string' ? value : value.name),
                        map(title => title ? this._filterLoc(title) : this.locations.slice())
                    );
            })
        }
        else if (this.selectedCriteria.type == "gender") {
            this.selectedLocation = "";
            this.fromAge = "";
            this.toAge = "";
            this.selectedProfession = "";
        }
        else if (this.selectedCriteria.type == "age") {
            this.selectedLocation = "";
            this.selectedGender = "";
            this.selectedProfession = "";
        }
        else if (this.selectedCriteria.type == "profession") {
            this.selectedLocation = "";
            this.selectedGender = "";
            this.fromAge = "";
            this.toAge = "";
        }
    }

    checked(event, ad) {
        if (event.checked == true) {
            this.adsIds.push(ad.id)
        }
        else {
            for (let index = 0; index < this.adsIds.length; index++) {
                if (this.adsIds[index] == ad.id) {
                    this.adsIds.splice(this.adsIds.indexOf(this.adsIds[index], 0), 1);
                }
            }
        }
        for (let index = 0; index < this.rows.length; index++) {
            if (this.rows[index].id == ad.id) {
                if (event.checked == true) {
                    this.rows[index].checked = true;
                }
                else {
                    this.rows[index].checked = false;
                }
            }

        }
    }

    addCampaign() {
        if (this.selectedPartner.id == 0) {
            this.snack.open("الرجاء إدخال اسم مستخدم صحيح", "حسناً");
            return;
        }
        var data = this.form.value;
        delete data.criteriaType;
        delete data.fromAge;
        delete data.gender;
        delete data.location;
        delete data.profession;
        delete data.toAge;
        if (this.role == "partner") {
            data.status = "pending";
            data.view_impressions = false;
            delete data.partner;
        }
        data.partner_id = this.selectedPartner.id;
        data.completed = 0;
        data.start = data.start.toISOString();
        data.expiration_date = data.expiration_date.toISOString();
        data.criteria = [];
        data.adsIds = this.adsIds;
        for (let index = 0; index < this.myData.length; index++) {
            var temp: any = {};
            temp.type = this.myData[index].criteria;
            temp.operator = "=";
            if (this.myData[index].criteria == "age") {
                temp.value = this.sendCriteriaFromAge;
                temp.value2 = this.sendCriteriaToAge;
                temp.operator = "<>";
            }
            else if (this.myData[index].criteria == "gender") {
                temp.value = this.myData[index].data.toLowerCase();
            }
            else if (this.myData[index].criteria == "location") {
                temp.value = this.myData[index].id;
            }
            else {
                temp.value = this.myData[index].data;
            }
            data.criteria.push(temp)
        }
        //console.log(data);
        this.mainServ.APIServ.post("campaigns", data).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.goTo("campaign")
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }

    pushCriteria() {
        if (this.selectedCriteria.type == "location") {
            var ok = false;
            for (let index = 0; index < this.locations.length; index++) {
                if (this.selectedLocation.id == this.locations[index].id) {
                    ok = true;
                    break;
                }
            }
            if (ok == false) {
                this.snack.open("الرجاء إدخال موقع صحيح", "حسناً");
                return;
            }
        }
        this.newCriteria.criteria = this.selectedCriteria.type;
        this.newCriteria.cpi = this.selectedCriteria.perImp;
        this.newCriteria.cpc = this.selectedCriteria.perClick;
        var exist = false;
        for (let index = 0; index < this.myData.length; index++) {
            if (this.newCriteria.criteria == this.myData[index].criteria) {
                exist = true;
                break;
            }
        }
        if (exist == false) {
            this.CPI = this.CPI + this.selectedCriteria.perImp;
            this.CPC = this.CPC + this.selectedCriteria.perClick;
        }
        if (this.newCriteria.criteria == "location") {
            this.newCriteria.data = this.selectedLocation.name;
            this.newCriteria.id = this.selectedLocation.id;
            console.log(this.newCriteria);
            this.selectedCriteria = {};
        }
        else if (this.newCriteria.criteria == "gender") {
            this.newCriteria.data = this.selectedGender.name;
            for (let index = 0; index < this.criteriaTypes.length; index++) {
                if (this.criteriaTypes[index].type == this.newCriteria.criteria) {
                    this.genderObject = this.criteriaTypes[index];
                    this.genderIndex = this.criteriaTypes.indexOf(this.criteriaTypes[index], 0);
                    this.criteriaTypes.splice(this.genderIndex, 1);
                    this.selectedCriteria = {};
                }
            }
        }
        else if (this.newCriteria.criteria == "age") {
            this.newCriteria.data = "من" + " " + this.fromAge + " الى " + " " + this.toAge;
            this.sendCriteriaFromAge = this.fromAge;
            this.sendCriteriaToAge = this.toAge;
            for (let index = 0; index < this.criteriaTypes.length; index++) {
                if (this.criteriaTypes[index].type == this.newCriteria.criteria) {
                    this.ageObject = this.criteriaTypes[index];
                    this.ageIndex = this.criteriaTypes.indexOf(this.criteriaTypes[index], 0)
                    this.criteriaTypes.splice(this.ageIndex, 1);
                    this.selectedCriteria = {};
                }
            }
        }
        else if (this.newCriteria.criteria == "profession") {
            this.newCriteria.data = this.selectedProfession.name;
            this.selectedCriteria = {};
        }
        this.myData.push(this.newCriteria);;
        this.dataSource.data = this.myData;
        this.newCriteria = {};
        this.selectedLocation = "";
        this.selectedGender = "";
        this.fromAge = "";
        this.toAge = "";
        this.selectedProfession = "";
    }

    deleteCriteria(cri) {
        var i = this.myData.indexOf(cri, 0);
        this.myData.splice(i, 1);
        this.dataSource.data = this.myData;
        if (cri.criteria == "gender") {
            this.criteriaTypes.splice(this.genderIndex, 0, this.genderObject)
        }
        if (cri.criteria == "age") {
            this.criteriaTypes.splice(this.ageIndex, 0, this.ageObject)
        }

        var exist = false;
        for (let index = 0; index < this.myData.length; index++) {
            if (cri.criteria == this.myData[index].criteria) {
                exist = true;
                break;
            }
        }
        if (exist == false) {
            this.CPI = this.CPI - cri.cpi;
            this.CPC = this.CPC - cri.cpc;
        }
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

}

export interface Criterias {
    criteria: string;
    data: string;
    cpi: number;
    cpc: number;
    id: number;
}

export interface Partners {
    fullname: string;
    id: number;
}

export interface Locations {
    name: string;
    id: number;
}