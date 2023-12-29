import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApplicantService, ApplicationService, CollateralService, OfferService} from '@service/services';
import {SharedkeyDataService} from '@customer/shared/sharedkey-data.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {
    AddressModel,
    ApplicantModel,
    ApplicationModel,
    CollateralModel,
    ConsentModel,
    ContactHistoryModel,
    CustomerConsentModel,
    EmploymentModel,
    IdentityModel,
    KeyIdentifierModel,
    ResidenceModel
} from '@service/models';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {DatePipe} from '@angular/common';
import {MatDialog, MatSelectChange} from '@angular/material';
import {LayoutUtilsService, MessageType} from '@core/util-services/utils/layout-utils.service';
import {TypesUtilsService} from '@core/util-services/utils/types-utils.service';
import {ProductConfigService} from '@service/config/product-config.service';
import {AuthenticationService} from '@core/auth/authentication.service';

@Component({
    selector: 'm-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

    applicantId: number;
    applicant: ApplicantModel;
    application: ApplicationModel;
    residence: ResidenceModel;
    address: AddressModel;
    employmentAdd: EmploymentModel;
    employments: EmploymentModel[];
    identity: IdentityModel;
    identities: IdentityModel[];
    loadingSubject = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();
    loadingDataCompleted: boolean;
    hasFormErrors: boolean = false;
    viewLoading: boolean = false;
    employeeId: string;
    minDate = new Date();
    maxDate = new Date();
    isNewApplication: boolean;
    isNewApplicant: boolean;
    isSwitchedToEditMode: boolean = false;
    loadingAfterSubmit: boolean = false;
    isSwitchedToIdentificationEditMode: boolean = false;

    empDisplayedColumns = ['empStatus', 'empType', 'empName', 'salary', 'length', 'actions'];
    identityDisplayedColumns = ['idType', 'idNumber', 'idIssue', 'idExpire', 'actions'];
    availableIdentificationTypes: string[] = ['Driver License', 'State Issued Id', 'Passport', 'Other'];
    filteredIdentificationTypes: Observable<string[]>;
    availableResidenceStatus: string[] = ['Own', 'Renting', 'Lease', 'Other'];
    filteredResidenceStatus: Observable<string[]>;
    veteranStatus: string;

    citizenInd: string;

    keyIdentifier: KeyIdentifierModel;
    subscription: Subscription;
    productConfigServiceSubscription: Subscription;

    applicationSub: Subscription;
    collateralSub: Subscription;
    consent: ConsentModel;
    collateral: CollateralModel;
    contact: ContactHistoryModel;

    // Product configuration
    productConfig: any;

    empLoadingSubject = new BehaviorSubject<boolean>(true);
    empLoading$ = this.loadingSubject.asObservable();

    @ViewChild('f') f: NgForm;
    appForm: FormGroup;

    public incomeModes = [{value: 'Annual', viewValue: 'A'}, {value: 'Monthly', viewValue: 'M'}];

    barButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Save & Continue',
        buttonColor: 'primary',
        barColor: '#C1D72E',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };
    displayRole: boolean = false;
    masterPartnerList: any = [];

    constructor(
        private elRef: ElementRef,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        private appFB: FormBuilder,
        private layoutUtilsService: LayoutUtilsService,
        private typesUtilsService: TypesUtilsService,
        private applicantService: ApplicantService,
        private applicationService: ApplicationService,
        private sharedKeyDataService: SharedkeyDataService,
        private productConfigService: ProductConfigService,
        private collateralService: CollateralService,
        private authService: AuthenticationService,
        private offerService: OfferService,
        private zone: NgZone,
        private datePipe: DatePipe) {
        this.subscription = sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
        });
        this.applicantId = 0;
        this.contact = new ContactHistoryModel();
        this.isNewApplication = true;
        this.isNewApplicant = true;
        this.loading$.subscribe((data) => {
            this.loadingDataCompleted = !data;
            this.viewLoading = data;
        });
    }

    ngOnInit() {
        this.loadingSubject.next(true);
        this.productConfig = this.productConfigService.productConfig.config;
        // allow dob if it is greater than 18 years old
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 14);
        this.minDate.setFullYear(this.minDate.getFullYear() - 140);
        this.initNewApplication();
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.applicationId === undefined || params.applicationId === null) {
                this.isNewApplication = true;
                this.keyIdentifier = new KeyIdentifierModel(true);
                this.keyIdentifier.applicationId = null;
                this.initNewApplication();
            } else {
                // this.isNewApplication = false;
                this.application = this.keyIdentifier.application;
                this.keyIdentifier.applicationId = params.applicationId;
                if ((this.application === undefined || this.application === null) && this.keyIdentifier.applicationId > 0) {
                    this.initApplication();
                }
                if (params.applicantId === undefined || params.applicantId === null) {
                    this.isNewApplicant = true;
                    this.initApplicant('S', 'J');
                } else {
                    this.applicantId = params.applicantId;
                    this.loadApplicant();
                }
            }
        });
    }

    initApplication() {
        this.subscription = this.applicationService.findApplication(this.keyIdentifier.applicationId).subscribe(
            res => {
                this.application = this.keyIdentifier.application = res;
                this.keyIdentifier.updateKeyIdentifier(res);
                this.sharedKeyDataService.announceIdentifierChanges(this.keyIdentifier);
                this.loadingSubject.next(false);
            }, error => {
                this.layoutUtilsService.showActionNotification(error.type, MessageType.Create,
                    1000, true, false);
                this.loadingSubject.next(false);
            }
        );
    }

    initNewApplication() {
        this.application = new ApplicationModel();
        this.consent = new ConsentModel();
        this.collateral = new CollateralModel();
        this.initApplicant();
    }

    initApplicant(applicantType: string = 'P', applicationType: string = 'I') {
        this.applicant = new ApplicantModel();
        this.keyIdentifier.isPrimaryApplicant = applicantType === 'P';
        this.application.applicationType = applicationType;
        this.address = new AddressModel();
        this.employmentAdd = new EmploymentModel();
        this.employmentAdd.empStatus = 'C';
        this.residence = new ResidenceModel();
        this.employments = [];
        this.identities = [];
        this.identity = new IdentityModel();
    }

    loadApplicant() {
        if (this.keyIdentifier.isCashApplication) {
            this.initCollateral();
        }
        this.applicantService.findApplicant(this.applicantId).subscribe(res => {
            this.applicant = res;
            this.loadingSubject.next(false);
        }, error => {
            this.sharedKeyDataService.mapErrorCodes(error);
            this.loadingSubject.next(false);
        });
    }

    loadCollateral(res) {
        if (res === undefined || res === null) {
            this.collateral = new CollateralModel();
            return;
        }
        this.collateral = res;
        if (this.collateral.collateralId === undefined || this.collateral.collateralId === null
            || this.collateral.collateralId === 0) {
            this.collateral = new CollateralModel();
        } else {
            this.keyIdentifier.collateralId = this.collateral.collateralId;
        }
        this.keyIdentifier.updateCollateralStatus(this.collateral);
        this.sharedKeyDataService.announceIdentifierChanges(this.keyIdentifier);
    }

    initCollateral() {
        this.collateralSub = this.collateralService.getCollateral(this.keyIdentifier.applicationId).subscribe(res => {
            this.loadCollateral(res);
        }, error => {
            this.collateral = new CollateralModel();
        });
    }


    generateOffer() {
        // Regenerated the offer only if offer already generated but customer profile is updated
        /* if (this.keyIdentifier.isOfferGenerated) {
            //this.offerService.generateOfferForApplication(this.keyIdentifier.applicationId)
                .subscribe(res => {
                    this.keyIdentifier.tracker = 'Offer Generated Response';
                });
        } */
    }

    editEmploymentButtonOnClick(_item: EmploymentModel) {
        console.log('editEmploymentButtonOnClick:: ', JSON.stringify(_item, null, 4));
        _item._isEditMode = true;
        this.isSwitchedToEditMode = true;
    }

    cancelAddButtonOnClick() {
        this.employmentAdd._isEditMode = false;
        this.isSwitchedToEditMode = false;
    }

    cancelEditButtonOnClick(_item: EmploymentModel) {
        _item._isEditMode = false;
        this.isSwitchedToEditMode = false;
    }

    goBack() {
        if (this.keyIdentifier.applicationId > 0) {
            this.router.navigate(['/application/edit'], {queryParams: {applicationId: this.keyIdentifier.applicationId}});
        } else {
            this.router.navigate(['/dashboard']);
        }
    }

    /** Method to be invoked everytime we receive a new instance
     the address object from the onSelect event emitter.
     */
    addressSelected(addrObj) {
        console.log('addrObj:: ', JSON.stringify(addrObj, null, 4));
        // We are wrapping this in a zone method to reflect the changes to the object in the DOM.
        this.zone.run(() => {
            this.address.streetAddress = addrObj.street_number + ' ' + addrObj.route;
            this.address.zipCode = addrObj.postal_code;
            this.address.city = addrObj.locality;
            this.address.state = addrObj.admin_area_l1;
            this.address.county = addrObj.county;
        });
    }

    startProgressBarAction() {
        console.log(' startProgressBarAction .. started');
        this.barButtonOptions.active = true;
        this.barButtonOptions.text = 'Processing ...';
        // this.barButtonOptions.mode = 'indeterminate';
    }

    completeProgressBarAction() {
        console.log(' completeProgressBarAction .. completed');
        this.barButtonOptions.active = false;
        this.barButtonOptions.text = 'Save & Continue';
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.applicationSub) {
            this.applicationSub.unsubscribe();
        }
    }

    convertNumber(val: any) {
        if (val === undefined || val === null) {
            return 0;
        }
        return val.toString().replace(/[^0-9]*/g, '');
    }

    scrollToField() {
        const invalid = this.elRef.nativeElement.querySelector('.ng-invalid');
        if (invalid) {
            invalid[0].scrollIntoView();
        }
    }
}