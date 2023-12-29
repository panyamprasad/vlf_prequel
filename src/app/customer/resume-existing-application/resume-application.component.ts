import {
    EventEmitter,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DatePipe, UpperCasePipe, formatDate } from '@angular/common';
import {
    AddressModel,
    ApplicantModel,
    CollateralModel,
    ConsentModel,
    BusinessModel,
    AboutCustomerModel,
    SearchModel
} from '@service/models';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { KeyIdentifierModel } from '@service/models/key-identifier.model';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ApplicationModel } from '../../core/creditsnap/models/application.model';
import { FormGroup } from '@angular/forms';
import { FindApplicationModel } from '@service/models/find-application';
import { FindApplicationService } from '@service/services/findapplication.service';
import { OnDestroy } from '@angular/core';
import { Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApplicationResponseModel } from '@service/models/application';
import { ApplicationService, OfferService } from '@service/services';
@Component({
    selector: 'm-resume-application',
    templateUrl: './resume-application.component.html',
    styleUrls: ['./resume-application.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, UpperCasePipe]
})
export class ResumeApplicationComponent implements OnInit, OnDestroy {
    @Output() submitEventEmitter: EventEmitter<{
        options: any, applicant: ApplicantModel, consent: ConsentModel,
        collateral: CollateralModel
    }>;

    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    values: boolean = false;
    clickedbutton: boolean = false;
    errorMessage: boolean = false;
    registrationForm: FormGroup;
    fieldTextType: boolean;
    keyIdentifier: KeyIdentifierModel;
    application: ApplicationModel;
    applicant: ApplicantModel;
    resumeapplication: FindApplicationModel;
    private title: Title;
    search: SearchModel;
    customer: AboutCustomerModel;
    address: AddressModel;
    business: BusinessModel;
    collateral: CollateralModel;
    minDate = new Date();
    maxDate = new Date();
    applicationValue: any = {};
    applicatonValueObj: ApplicationResponseModel;
    @ViewChild('f') f: NgForm;
    consent: ConsentModel;
    @ViewChild('mScrollTop') elScrollTop: ElementRef;
    scrollTop: any;
    submitButtonText: string;
    subscription: Subscription;
    loanPurposes: any = [];
    appConfig: any;
    loanPurposeConfig: any;
    isSubmitting = false;
    applicationId: number;
    applicantId: number;
    activityStatus: string;
    barButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Continue',
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
    public currentURL: string = "";
    constructor(
        private datePipe: DatePipe,
        private applicationService: ApplicationService,
        private offerService: OfferService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sharedKeyDataService: SharedkeyDataService,
        private findapplicationService: FindApplicationService) {
        this.subscription = sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
            this.loanPurposeConfig = data.loanPurposeConfig;
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        this.initCustomer();

        // allow dob if it is greater than 18 years old
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
        this.minDate.setFullYear(this.minDate.getFullYear() - 85);
        this.search = new SearchModel();
        this.loadingSubject.next(false);
        this.currentURL = this.router.url;
    }


    initCustomer() {
        this.resumeapplication = new FindApplicationModel();
    }
    homePage() {
        let url = "https://peoplefund.org/get-a-loan/continue/"
        window.location.href = url;
    }

    startProgressBarAction() {
        console.log(' startProgressBarAction .. started');
        this.barButtonOptions.active = true;
        this.loadingSubject.next(true);
        this.barButtonOptions.text = 'Finding Your App...';
        // this.barButtonOptions.mode = 'indeterminate';
    }

    onSubmit() {
        this.router.navigate(["/resumeProfile"]);
    }

    findApplicationAction() {
        this.barButtonOptions.active = false;
        this.loadingSubject.next(false);
    }

    completeProgressBarAction() {
        console.log(' completeProgressBarAction .. completed');
        this.barButtonOptions.active = false;
        this.loadingSubject.next(false);
    }

    onContinue() {
        return new Promise((resolve, reject) => {
            this.offerService.findOfferNewByApplicationId(this.applicationId).subscribe(res => {
                if (res.code == 200 && this.activityStatus == null || this.activityStatus == "OFFER_VIEWED") {
                    this.router.navigate(["/offer"]);
                } else if (
                    this.activityStatus == "OFFER_ACCEPTED" ||
                    this.activityStatus == "ADDITIONAL_INFO_ADDED") {
                    this.router.navigate(["/review"]);
                } else if (
                    this.activityStatus == "REVIEWEDATA_VIEWED") {
                    this.router.navigate(["/reviewdata"]);
                } else if (this.activityStatus == "ADDITIONAL_INFO_ACCEPTED") {
                    this.router.navigate(["/thankyou"]);
                }
                else if (res.code == 401) {
                    let statusCode = res.code;
                    this.applicationService.setErrorCode(statusCode);
                    this.router.navigate(["/thankyou"]);
                }

            }, error => {
                console.log("error while getting offer...", error);
            });
        });

    }

}