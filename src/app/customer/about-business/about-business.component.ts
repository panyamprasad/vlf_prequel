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
import { DatePipe, UpperCasePipe } from '@angular/common';
import {
    AddressModel,
    ApplicantModel,
    CollateralModel,
    ConsentModel,
    ResidenceModel,
    BusinessModel,
    AboutCustomerModel
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
import { ApplicationModel } from '../../core/creditsnap/models/application.model';
import { ApplicationStatusEnum } from '../../core/creditsnap/enum/process-state.enum';
import { AboutService } from 'app/services/about.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerDetailsService } from '@customer/customer-details.service';
import { BusinessDetailService } from '@customer/business-detail.service';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MyDialogCustomerCancelComponent } from '@customer/my-dialog/my-dailog.customerState.component';
@Component({
    selector: 'm-about-business',
    templateUrl: './about-business.component.html',
    styleUrls: ['./about-business.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, UpperCasePipe]
})
export class AboutBusinessComponent implements OnInit, OnDestroy {

    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    values: boolean = false;
    showcontent: boolean = false;
    registrationForm: FormGroup;
    fieldTextType: boolean;
    keyIdentifier: KeyIdentifierModel;
    application: ApplicationModel;
    applicant: ApplicantModel;
    customer: AboutCustomerModel;
    address: AddressModel;
    business: BusinessModel;
    collateral: CollateralModel;
    minDate = new Date();
    maxDate = new Date();
    @ViewChild('f') f: NgForm;
    consent: ConsentModel;
    @ViewChild('mScrollTop') elScrollTop: ElementRef;
    scrollTop: any;
    submitButtonText: string;
    subscription: Subscription;
    loanPurposes: any = [];
    appConfig: any;
    loanPurposeConfig: any;
    barButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Get Pre-Qualified',
        buttonColor: 'accent',
        barColor: '#C1D72E',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };
    loanPurposePopulated: boolean = false;
    public e: any;
    constructor(
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private elRef: ElementRef,
        private zone: NgZone,
        private fb: FormBuilder,
        private sharedKeyDataService: SharedkeyDataService,
        private productConfigService: ProductConfigService,
        private applicationService: ApplicationService,
        private datePipe: DatePipe,
        private uppercasePipe: UpperCasePipe,
        private aboutService: AboutService,
        private http: HttpClient,
        private customerDetailsService: CustomerDetailsService,
        private businessDetailService: BusinessDetailService) {
        this.subscription = sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
            this.loanPurposeConfig = data.loanPurposeConfig;
        });
        this.submitButtonText = 'View My Offers';
    }
    ngOnInit() {
        this.appConfig = AppConfigService.config;
        _.forEach(AppConfigService.config.loanPurpose, (value, key) => {
            this.loanPurposes.push(value);
        });

        if (this.keyIdentifier.referralCode && this.keyIdentifier.referralCode.includes('enterpriseflt')) {
            this.keyIdentifier.isCashApplication = true;
            this.keyIdentifier.loanPurpose = 'C';
            this.setButtonText();
        }
        this.minDate.setFullYear(this.minDate.getFullYear() - 2);
        // // Check if appId received from the query params, then load the application
        this.completeProgressBarAction();
        this.markElementsUntouched();
        this.elScrollTop.nativeElement.scrollTop = top;
        this.initCustomer();
    }

    markElementsUntouched() {
        Object.keys(this.f.controls).forEach(fieldName => {
            this.f.controls[fieldName].markAsPristine();
            this.f.controls[fieldName].markAsUntouched();
        });
    }
    showContent() {
        this.showcontent = !this.showcontent;
    }
    initCustomer() {
        this.business = new BusinessModel();
        this.applicant = new ApplicantModel();
        this.application = new ApplicationModel();
        this.address = new AddressModel();
        this.consent = new ConsentModel();
        this.customer = new AboutCustomerModel();
    }

    onSubmit() {
        this.router.navigate(["/offer"]);
    }

    Continue():
        void {
        const dialogRef = this.dialog.open(MyDialogCustomerCancelComponent, {
            width: '550px',
        });
    }

    loanPurposeChanged(_$event: MatSelectChange) {
        //    console.log(' productChanged : ' + _$event.value);
    }

    applicationType(_$event: MatSelectChange) {
        this.keyIdentifier.applicationType = _$event.value;
        this.setButtonText();
    }

    setButtonText() {
        this.submitButtonText = this.barButtonOptions.text = 'Continue';
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
    initToggelView() {
        this.registrationForm = this.fb.group({
            password: ["", Validators.required],
        });

    }

    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }
    startProgressBarAction() {
        //  console.log(' startProgressBarAction .. started');
        this.barButtonOptions.active = true;
        this.barButtonOptions.text = 'Processing ...';
        this.barButtonOptions.mode = 'indeterminate';
    }

    completeProgressBarAction() {
        // console.log(' completeProgressBarAction .. completed');
        this.barButtonOptions.active = false;
        this.barButtonOptions.text = 'Get Pre-Qualified';
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