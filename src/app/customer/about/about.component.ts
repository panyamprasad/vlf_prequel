import {ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject, Subscription, throwError} from 'rxjs';
import {
    AddressModel,
    ApplicantModel,
    ApplicationModel,
    CollateralModel,
    ConsentModel,
    CustomerConsentModel
} from '@service/models';
import {ApplicantService, ApplicationService} from '@service/services';
import {KeyIdentifierModel} from '@service/models/key-identifier.model';
import {ApplicationStatusEnum, ProcessStateEnum} from '@service/enum/process-state.enum';
import {SharedkeyDataService} from '@customer/shared/sharedkey-data.service';
import {HeaderService} from '@core/util-services/layout/header.service';
import {Credential} from '@core/auth/credential';
import {AuthenticationService} from '@core/auth/authentication.service';
import * as urlParse from 'url-parse';
import {Title} from '@angular/platform-browser';
import {environment} from "@env/environment";

@Component({
    selector: 'm-customer-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit, OnDestroy {

    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    applicationSub: Subscription;
    authenticationSubscription: Subscription;
    keyIdentifier: KeyIdentifierModel;
    parentSubject: Subject<any>;
    newApp: ApplicationModel;
    address: AddressModel = new AddressModel();
    customTitleMessage: boolean;
    institutionId = environment.institutionId;

    constructor(
        private titleService: Title,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private applicationService: ApplicationService,
        private applicantService: ApplicantService,
        private headerService: HeaderService,
        private authenticationService: AuthenticationService,
        private zone: NgZone,
        // private splashScreenService: SpinnerOverlayService,
        private sharedKeyDataService: SharedkeyDataService) {
        sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
        });
        console.log('check preapproval', this.keyIdentifier);
        this.parentSubject = new Subject<any>();
        this.keyIdentifier.errorCode = this.keyIdentifier.errorMessage = null;
        this.customTitleMessage = false;
    }

    ngOnInit() {
        this.loadingSubject.next(true);
        this.titleService.setTitle('About You: No Credit Impact to check your rates');
        if (this.keyIdentifier.applicationStatus
            === ApplicationStatusEnum.PRIMARY_APPLICANT_ADDED || this.keyIdentifier.isCoBorrowerNeeded) {
            this.keyIdentifier.primaryApplicantAdded = true;
            this.keyIdentifier.currentStatus = ProcessStateEnum.PrimaryAdded;
            this.nextStep();
        } else {
            this.keyIdentifier = this.sharedKeyDataService.initializeIdentifier(this.keyIdentifier);
            this.keyIdentifier.updateURLIdentifiers(urlParse(this.router.url, true));
            this.initialize();
        }
        // this.parentSubject.next(this.keyIdentifier);
    }

    ITAWithPrefill() {
        this.newApp = this.keyIdentifier.application;
        this.loadingSubject.next(false);
    }

    initialize() {
        this.newApp = this.keyIdentifier.application;
        // Pass pre apprval app id if it is from offer code...
        if (this.keyIdentifier.preApprovalApplicationId) {
            this.newApp.preApprovalApplicationId = this.keyIdentifier.preApprovalApplicationId;
        }
        this.activatedRoute.queryParams.subscribe(params => {
            //  console.log('query params =>', params);
            if (params['subID']) {
                this.newApp.leadId = params['subID'];
            }
            /*if (params['referrer_id']) {
                this.newApp.referralCode = params['referral_code'];
            }*/
            if (params['partner_number']) {
                this.newApp.partnerId = params['partner_number'];
            }
            if (params['applicantType']) {
                this.keyIdentifier.applicantType = params['applicantType'];
            }
            if (params['applicationId']) {
                this.keyIdentifier.applicationId = params['applicationId'];
            }
        });
        this.newApp.referralCode = this.keyIdentifier.referralCode;
        this.loadingSubject.next(false);
    }

    loanPurposeChanged(isCashApplication: boolean) {
        this.keyIdentifier.isCashApplication = isCashApplication;
    }

    onSubmit(event: any) {
        this.loadingSubject.next(true);
        //  this.splashScreenService.show(this.loadingSubject);
        const applicant = event.applicant;
        /*if (!this.keyIdentifier.isCashApplication) {
            applicant.ssn = applicant.ssn.toString().replace(/([\s,.€()_-])+/g, '');
        }*/
        applicant.primaryPhone = applicant.primaryPhone.toString().replace(/([\s,.€()_-])+/g, '');
        this.keyIdentifier = event.options;
        const consent = event.consent;
        //     console.log('key identifier received on submit => ', this.keyIdentifier, applicant);
        if (this.keyIdentifier.primaryApplicantAdded) {
            this.addApplicant(applicant);
        } else {
            this.createApplication(applicant, consent, event.collateral);
        }
    }

    createApplication(applicant: ApplicantModel, consentOld: ConsentModel, collateral: CollateralModel) {
        console.log('About component create application => ', (new Date()).getUTCMilliseconds());
        this.keyIdentifier.errorCode = this.keyIdentifier.errorMessage = null;
        let consent = new CustomerConsentModel();
        // Must check the customer selected options before loading into database
        consent.name = 'Marketing';
        consent.value = 'N';
        if (consentOld.marComConsent) {
            consent.value = 'Y';
        }
        this.newApp.consents = [];
        this.newApp.consents.push(consent);
        consent = new CustomerConsentModel();
        consent.name = 'SoftInQuiry';
        consent.value = 'Y';
        this.newApp.consents.push(consent);
        this.newApp.applicants = [];
        this.newApp.referralCode = this.keyIdentifier.referralCode;
        this.newApp.leadId = this.keyIdentifier.subId;
        this.newApp.applicants.push(applicant);
        this.newApp.loanPurpose = this.keyIdentifier.loanPurpose;
        this.newApp.productType = this.newApp.productName = this.keyIdentifier.identifyProductType(this.keyIdentifier.loanPurpose);
        this.newApp.applicationType = this.keyIdentifier.applicationType;
        this.keyIdentifier.applicantFirstName = applicant.firstName;
        this.keyIdentifier.applicantLastName = applicant.lastName;
        this.keyIdentifier.updateKeyIdentifier(this.newApp);
        if (this.keyIdentifier.isCashApplication) {
            this.newApp.collateral = collateral;
            this.createShortApplication();
        } else {
            delete this.newApp.collateral;
           // this.submitCreateApplicationTOAPI();
        }
    }

    createShortApplication() {
        // console.log('creating new createShortApplication with toPromise() => ', (new Date()).getUTCMilliseconds());
        this.applicationService.createShortApplication(this.newApp).subscribe(res => {
            //   console.log('Application is created successfully, the application id =>', (new Date()).getUTCMilliseconds(), res);
            this.newApp.applicationId = res.applicationId;
            this.newApp.status = this.newApp.applicationStatus = res.applicationStatus;
            this.onSubmitResponse(res);
            //   console.log('Validating response is completed =>', (new Date()).getUTCMilliseconds());
            if (this.keyIdentifier.isCashApplication) {
                this.nextStep();
            } else {
                //  console.log('Calling generate key =>', (new Date()).getUTCMilliseconds());
                this.generateTokenWithApp(this.newApp);
            }
        }, error => {
            // console.log('hmm application has bad response =>', (new Date()).getUTCMilliseconds());
            this.errorHandler(error);
        });
    }

    generateTokenWithApp(app: ApplicationModel) {
        this.keyIdentifier.errorCode = this.keyIdentifier.errorMessage = null;
        // console.log('generateTokenWithApp: application created, waiting for token =>', JSON.stringify(app));
        if (app.applicationId === undefined || app.applicationId === null || app.applicationId <= 0 ||
            app.applicants === undefined || app.applicants === null) {
            // Info: This shouldn't happen but happened, we should direct customer to thank you page
            return throwError({status: '70002', message: 'Application ID is missing'});
        }
        const credential: Credential = new Credential();
        credential.username = app.applicationId.toString();
        const applicant = app.applicants[0];
        credential.grant_type = 'password';
        // console.log('Ready to call for token =>', (new Date()).getUTCMilliseconds());
        this.authenticationSubscription = this.authenticationService.authenticate(credential).subscribe(result => {
            //   console.log('application created and token generated =>', result);
            // this.authenticationService.saveAccessData(result);
            this.nextStep();
        }, err => {
            // console.log('generateTokenWithApp response failed =>', (new Date()).getUTCMilliseconds());
            this.errorHandler(err);
        });
    }

    addApplicant(applicant: ApplicantModel) {
        this.keyIdentifier.errorCode = this.keyIdentifier.errorMessage = null;
        this.keyIdentifier.coborrowerFirstName = applicant.firstName;
        this.keyIdentifier.coborrowerLastName = applicant.lastName;
        // this.keyIdentifier.applicationStatus = ApplicationStatusEnum.APPLICATION_SUBMITTED;
        //  console.log('adding applicant to the existing application =>', applicant);
        this.applicantService.addApplicant(this.keyIdentifier.applicationId, applicant).subscribe(res => {
            this.keyIdentifier.isCoBorrowerNeeded = false;
            this.onSubmitResponse(res);
            this.nextStep();
        }, error => {
            //    console.log('addApplicant response failed =>', (new Date()).getUTCMilliseconds());
            this.errorHandler(error);
        });
    }

    /** Method to be invoked every time we receive a new instance
     the address object from the onSelect event emitter.
     */
    addressSelected(addrObj) {
        // We are wrapping this in a zone method to reflect the changes to the object in the DOM.
        this.zone.run(() => {
            this.address.streetAddress = addrObj.street_number + ' ' + addrObj.route;
            this.address.zipCode = addrObj.postal_code;
            this.address.city = addrObj.locality;
            this.address.state = addrObj.admin_area_l1;
            this.address.county = addrObj.county;
            // console.log('address is selected about you component => ', this.address);
        });
    }

    onSubmitResponse(_res: any) {
        //   console.log('About component onSubmitResponse => ', _res);
        //  this.keyIdentifier.updateKeyIdentifier(_res);
        this.keyIdentifier.applicationId = _res.applicationId;
        this.keyIdentifier.applicationStatus = _res.applicationStatus;
        if (this.keyIdentifier.applicationStatus === ApplicationStatusEnum.PRIMARY_APPLICANT_ADDED) {
            this.keyIdentifier.primaryApplicantAdded = true;
            this.keyIdentifier.currentStatus = ProcessStateEnum.PrimaryAdded;
        } else {
            this.keyIdentifier.currentStatus = ProcessStateEnum.CoborrowerAdded;
        }
        // this.nextStep();
    }

    nextStep() {
        // the key identifier should be announced since next components required the updated key identifier.
        this.sharedKeyDataService.announceIdentifierChanges(this.keyIdentifier);
        const keys = this.sharedKeyDataService.performApplicationNextAction(this.keyIdentifier);
        this.keyIdentifier.errorCode = !this.keyIdentifier.isCoBorrowerNeeded ? keys.errorCode : null;
        if (this.keyIdentifier.applicationStatus === ApplicationStatusEnum.PRIMARY_APPLICANT_ADDED || this.keyIdentifier.isCoBorrowerNeeded) {
            console.log('Co-borrower application, moving to co-borrower screen =>', this.keyIdentifier);
            if (this.keyIdentifier.isCoBorrowerNeeded) {
                this.keyIdentifier.applicationType = this.institutionId === 'LGR' ? 'C' : 'J';
            }
            this.parentSubject.next('S');
        } else {
            // console.log('The application has next steps, so finding the next step =>', this.keyIdentifier);
            this.router.navigate([keys.navigationAction], {relativeTo: this.activatedRoute});
        }
        this.stopSplashScreen();
    }

    errorHandler(error) {
        // console.log('landed at error handler =>', (new Date()).getUTCMilliseconds());
        this.keyIdentifier.tracker = 'about errorCodes';
        this.sharedKeyDataService.mapErrorCodes(error, this.keyIdentifier);
        this.sharedKeyDataService.announceIdentifierChanges(this.keyIdentifier);
        this.stopSplashScreen();
        this.parentSubject.next('E');
    }

    stopSplashScreen() {
        this.loadingSubject.next(false);
        //  this.splashScreenService.hide();
    }

    ngOnDestroy() {
        // console.log('AboutYOuComponent destroyed');
        if (this.applicationSub) {
            this.applicationSub.unsubscribe();
        }
        if (this.authenticationSubscription) {
            this.authenticationSubscription.unsubscribe();
        }
    }
}
