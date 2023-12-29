import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DatePipe, UpperCasePipe, formatDate } from '@angular/common';
import {
    AddressModel,
    ApplicantModel,
    BusinessModel,
    CollateralModel,
    ConsentModel,
    EmploymentModel,
    ResidenceModel
} from '@service/models';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { NgForm, Validators } from '@angular/forms';
import { KeyIdentifierModel } from '@service/models/key-identifier.model';
import { MatDialog, MatSelectChange } from '@angular/material';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { ProductConfigService } from '@service/config/product-config.service';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from '@service/config/app-config.service';
import { ApplicationService } from '@service/services';
import * as _ from 'lodash';
import { ApplicationStatusEnum } from '@service/enum/process-state.enum';
import { CustomerDetailsService } from '@customer/customer-details.service';
import { BusinessDetailService } from '@customer/business-detail.service';
import { HttpClient } from '@angular/common/http';
import { ApplicantDetailService } from '@customer/applicant-detail.service';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MyDialogCancelComponent } from '@customer/my-dialog/my-dialog.cancelComponent';
const apiUrl = environment.apiUrl;
// const baseUrl = environment.baseUrl;
@Component({
    selector: 'm-application-applicant',
    templateUrl: './applicant.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, UpperCasePipe]
})
export class ApplicantComponent implements OnInit, OnDestroy {

    @Input() parentSubject: Subject<string>;
    @Input() loadingSubject: BehaviorSubject<boolean>;
    @Output() submitEventEmitter: EventEmitter<{
        options: any, applicant: ApplicantModel, consent: ConsentModel,
        collateral: CollateralModel
    }>;
    @Output() eventEmitter: EventEmitter<{ isCashApplication: boolean }>;
    // loading$ = this.loadingSubject.asObservable();
    keyIdentifier: KeyIdentifierModel;
    applicant: ApplicantModel;
    address: AddressModel;
    collateral: CollateralModel;
    employment: EmploymentModel;
    residence: ResidenceModel;
    business: BusinessModel;
    productName: string;
    income: number;
    maxDate = new Date();
    minDate = new Date(1905, 0, 1);
    @ViewChild('f') f: NgForm;
    consent: ConsentModel;
    hideMe = []; // For checking disclosures
    hideMeMarketing = []; // For checking disclosures
    @ViewChild('mScrollTop') elScrollTop: ElementRef;
    scrollTop: any;
    submitButtonText: string;
    veteranStatus: string;
    citizenInd: any;
    subscription: Subscription;
    // Product configuration
    loanPurposes: any = [];
    institutionId: any;
    appConfig: any;
    loanPurposeConfig: any;
    registrationForm: FormGroup;
    fieldTextType: boolean;
    buttonLoading = false;
    businessPercentage: number;
    barButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Next',
        buttonColor: 'accent',
        barColor: '#C1D72E',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };
    showConsent1 = false;
    showConsent2 = false;
    loanPurposePopulated: boolean = false;

    isSubmitting = false;
    constructor(
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private elRef: ElementRef,
        private zone: NgZone,
        private sharedKeyDataService: SharedkeyDataService,
        private productConfigService: ProductConfigService,
        private applicationService: ApplicationService,
        private datePipe: DatePipe,
        private uppercasePipe: UpperCasePipe,
        private customerDetailsService: CustomerDetailsService,
        private businessDetailService: BusinessDetailService,
        private applicantDetailService: ApplicantDetailService,
        private fb: FormBuilder,
        private http: HttpClient) {
        this.submitEventEmitter = new EventEmitter<{
            options: any, applicant: ApplicantModel, consent: ConsentModel,
            collateral: CollateralModel
        }>();
        this.subscription = sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
            this.loanPurposeConfig = data.loanPurposeConfig;
        });
        this.submitButtonText = 'View My Offers';
        this.eventEmitter = new EventEmitter<{ isCashApplication: boolean }>();
    }
    ngOnInit() {
        this.initCustomer();
    }
    initToggelView() {
        this.registrationForm = this.fb.group({
            password: ["", Validators.required],
        });

    }

    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    markElementsUntouched() {
        Object.keys(this.f.controls).forEach(fieldName => {
            this.f.controls[fieldName].markAsPristine();
            this.f.controls[fieldName].markAsUntouched();
        });
    }

    onKeyup(e) {
        const val = e.target.value;
        if (val > 0) {
            e.target.value = val > 100 ? e.target.value.substr(0, e.target.value.length - 1) : e.target.value;
            console.log(e.target.value);
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
            this.businessPercentage = e.target.value;
        } else {
            e.target.value = val == 0 ? null : e.target.value;
            console.log(e.target.value);
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
            this.businessPercentage = e.target.value;
        }
    }

    initCustomer() {
        if (this.keyIdentifier.isProspect) {
            this.applicant = this.keyIdentifier.primaryApplicant;
        } else {
            this.applicant = new ApplicantModel();
        }
        this.address = this.applicant.addressVO;
        if (this.address === undefined || this.applicant === null) {
            this.address = new AddressModel();
        }
        this.consent = new ConsentModel();
        this.employment = new EmploymentModel();
        this.residence = new ResidenceModel();
        this.collateral = new CollateralModel();
        if (this.applicationService.approvalApplicationData && !this.keyIdentifier.isPrimaryApplicantAdded) {
            this.applicant.firstName = this.applicationService.approvalApplicationData.firstName;
            this.applicant.lastName = this.applicationService.approvalApplicationData.lastName;
            this.applicant.primaryPhone = this.applicationService.approvalApplicationData.phone;
            this.applicant.addressVO.streetAddress = this.applicationService.approvalApplicationData.homeAddress;
            this.applicant.addressVO.zipCode = this.applicationService.approvalApplicationData.zip;
            this.applicant.addressVO.state = this.applicationService.approvalApplicationData.state;
            this.applicant.addressVO.city = this.applicationService.approvalApplicationData.city;
        }
    }

    onSubmit() {
        this.router.navigate(["/business"]);
    }

    applicationType(_$event: MatSelectChange) {
        this.keyIdentifier.applicationType = _$event.value;
        //this.setButtonText();
    }

    /** Method to be invoked every time we receive a new instance
     the address object from the onSelect event emitter. */
    addressSelected(addrObj) {
        // We are wrapping this in a zone method to reflect the changes to the object in the DOM.
        this.zone.run(() => {
            this.address.streetAddress = addrObj.street_number + ' ' + addrObj.route;
            this.address.zipCode = addrObj.postal_code;
            this.address.city = addrObj.locality;
            this.address.state = addrObj.admin_area_l1;
            this.address.county = addrObj.county;
            //  console.log('address is selected => ', this.address);
        });
    }

    countyIdentified(addrObj) {
        // We are wrapping this in a zone method to reflect the changes to the object in the DOM.
        this.zone.run(() => {
            if (this.address.county === undefined || this.address.county === null) {
                this.address.county = addrObj.county;
            }
        });
    }

    startProgressBarAction() {
        //  console.log(' startProgressBarAction .. started');
        console.log('---------------------enter startProgress method------------------------ ');
        this.barButtonOptions.active = true;
        this.barButtonOptions.text = 'Processing ...';
        this.barButtonOptions.mode = 'indeterminate';
    }

    goBackToMyApp() {
        this.router.navigate(['/myApp'], { relativeTo: this.activatedRoute });
    }

    scrollToField() {
        const invalid = this.elRef.nativeElement.querySelector('.ng-invalid');
        if (invalid) {
            invalid[0].scrollIntoView();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
