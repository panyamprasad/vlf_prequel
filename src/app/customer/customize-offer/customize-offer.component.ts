import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    ChangeDetectorRef,
} from '@angular/core';

import { ConsentModel } from '@service/models';

import { MatDialog, MatSlideToggleChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OfferOptionsVO } from '@service/vo';
import { ApplicationCreateResponseModel, CollateralModel, LoanAmountVariationsModel, OfferVariationModel } from '@service/models';
import { ApplicationService, OfferUtilService } from '@service/services';
import { KeyIdentifierModel } from '@service/models/key-identifier.model';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { ApplicationStatusEnum } from '@service/enum/process-state.enum';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { CurrencyPipe } from '@angular/common';
import { LabelType, Options } from 'ng5-slider';
import { OfferVariationTypeModel } from '@service/models/offerVariationType.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MyDialogComponent } from '@customer/my-dialog/my-dialog.component';
import { OfferNewModel } from '@service/models';
import { OfferNewSubmitModel } from '@service/models';
import { ConsoleLogPipe } from '@core/pipes/console-log.pipe';
import { OfferService } from '@service/services';
import { ApplicationResponseModel } from '@service/models/application';
import { ResumeApplicationComponent } from '@customer/resume-existing-application/resume-application.component';
import { MyDialogOfferSaveExitComponent } from '@customer/my-dialog/my-dailog.offerSaveExit.component';
import { AppConfigService } from '@service/config/app-config.service';

@Component({
    selector: 'm-customize-offer',
    templateUrl: './customize-offer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [CurrencyPipe],
    styleUrls: ['./customize-offer.component.scss']
})


export class CustomizeOfferComponent implements OnInit {

    @Input() loadingSubject: BehaviorSubject<boolean>;
    @Input() selectedOfferType: string;
    @Input() offerOptions: OfferOptionsVO;
    @Input() offerTypes: OfferVariationTypeModel;
    @Output() eventEmitter: EventEmitter<{ id: number, action: string, offer: OfferVariationModel }>;
    @Output() submitEventEmitter: EventEmitter<{ OfferVariationModel, consent: ConsentModel }>;

    //loadingSubject = new BehaviorSubject<boolean>(false);
    //loading$ = this.loadingSubject.asObservable();

    customerOfferVariations: OfferVariationModel[];
    localOfferOptions: OfferOptionsVO;
    customOptions: OfferOptionsVO;
    customerOffers: OfferVariationModel[];
    sliderOptions: Options = {
        floor: 0,
        ceil: 250
    };

    offerValuesObj: OfferNewModel;
    offerValues: any = {};
    offerSubmitValueObj: OfferNewSubmitModel;

    minBorrowAmount = 5000;
    maxBorrowAmount: number;
    expirationDate: any;
    closingCost: number = 0;
    monthlyPayment: number = 0;
    customLoanAmount: any = 0;
    private elRef: ElementRef;
    pvif: any = 0;
    enteredAmt: any;
    applicationId: number;
    applicantId: number;
    reentryApplicatioId: number;
    reentryApplicantId: number;
    null: number;
    appConfig: any;
    showConsent2 = false;
    consent: ConsentModel;
    submitButtonText: string;
    isLoading = true;
    buttonLoading = false;
    cancelButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Cancel',
        buttonColor: 'secondary',
        barColor: '#6c757d',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };

    continueButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Continue',
        buttonColor: 'accent',
        barColor: '#043673',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };

    barButtonSaveAndExit: MatProgressButtonOptions = {
        active: false,
        text: 'Save & Exit',
        buttonColor: 'accent',
        barColor: '#C1D72E',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private offerUtilService: OfferUtilService,
        private offerService: OfferService,
        private currencyPipe: CurrencyPipe,
        private cdr: ChangeDetectorRef,
        private sharedKeyDataService: SharedkeyDataService,
        private applicationService: ApplicationService) {
        this.eventEmitter = new EventEmitter<{ id: number, action: string, offer: OfferVariationModel }>();
        this.submitEventEmitter = new EventEmitter<{ OfferVariationModel, consent: ConsentModel }>();
        this.subscription = sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
        });
        this.multipleTerms = true;
        this.offerValuesObj = new OfferNewModel();
        this.offerSubmitValueObj = new OfferNewSubmitModel();
        this.getExpirationDate();

        const response: ApplicationCreateResponseModel = this.applicationService.getApplicationCreateResponse();
        this.reentryApplicatioId = this.applicationService.getApplication();
        this.reentryApplicantId = this.applicationService.getApplicant();
        this.applicationId = response != null ? response.applicationId : this.reentryApplicatioId;
        this.applicantId = response != null ? response.applicantId : this.reentryApplicantId;
        console.log("inside constructor...", this.applicationId, this.applicantId);
    }

    noOfferStatus: boolean;
    selectedOffer: OfferVariationModel;
    loanAmountVariations: LoanAmountVariationsModel;
    collateral: CollateralModel = new CollateralModel();
    selectedAchOption: boolean = true;
    keyIdentifier: KeyIdentifierModel;
    subscription: Subscription;
    multipleTerms: boolean;

    async ngOnInit() {
        this.isLoading = true;
        this.consent = new ConsentModel();
        this.appConfig = AppConfigService.config;
        await this.loadOffer();
    }

    OfferCancel():
        void {
        const dialogRef = this.dialog.open(MyDialogComponent, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
    }

    OfferContinue() {
        //this.offerValuesObj.loanAmount = this.customLoanAmount;
        //this.offerValuesObj.monthlyPayment = Math.round(this.monthlyPayment);
        //this.offerValuesObj.closingCost = Math.round(this.closingCost);
        this.putOffer();
        this.router.navigate(["/review"]);
    }

    getExpirationDate() {
        let now = new Date();
        let exDate: Date;

        exDate = new Date(now.setDate(now.getDate() + 7));
        this.expirationDate = exDate.getMonth() + 1 + '/' + exDate.getDate() + '/' + exDate.getFullYear();
    }

    scrollToField() {
        const invalid = this.elRef.nativeElement.querySelector('.ng-invalid');
        if (invalid) {
            invalid[0].scrollIntoView();
        }
    }

    updateAmount() {
        this.enteredAmt = Number(this.customLoanAmount.replace(/[^0-9.-]+/g, ""));
        if (this.enteredAmt >= this.minBorrowAmount && this.enteredAmt <= this.offerValues.loanAmount) {
            this.closingCost = ((this.enteredAmt * (this.offerValues.closingCostPercentage / 100)));

            this.pvif = this.powerOfInterestMonth(this.offerValues.apr, this.offerValues.term);
            this.monthlyPayment = (-(this.offerValues.apr) * this.enteredAmt * (this.pvif) / (this.pvif - 1)) * (-1);
        }
    }

    powerOfInterestMonth(apr, months) {
        return Math.pow((1 + apr), months);
    }

    roundingLoanAmount(amount) {
        return Math.ceil(amount / 100) * 100;
    }

    formatLoanAmountLabel(value: number) {
        return this.currencyPipe.transform(Math.round(value), 'USD', '', '1.0-0');
    }

    //Get offer details
    loadOffer() {
        console.log("in load offer********");
        //console.log("inside get offer()...", this.applicationId, this.applicantId);
        return new Promise((resolve, reject) => {
            this.offerService.findOfferNewByApplicationId(this.applicationId).subscribe(res => {
                // this.offerService.findOfferNewByApplicationId(1).subscribe(res => {
                if (res.code == 200) {
                    //console.log("printing result appID" + this.applicationId)
                    this.offerValuesObj = res;
                    this.offerValues = {
                        "apr": this.offerValuesObj.apr,
                        "loanAmount": this.offerValuesObj.loanAmount,
                        "monthlyPayment": this.offerValuesObj.monthlyPayment,
                        "term": this.offerValuesObj.term,
                        "closingCostPercentage": this.offerValuesObj.closingCostPercentage,
                        "closingCost": this.offerValuesObj.closingCost,
                        "intrestRatePercentage": this.offerValuesObj.intrestRatePercentage,
                        "preApprovedLoanAmount": this.offerValuesObj.preApprovedLoanAmount
                    }
                    this.customLoanAmount = this.formatLoanAmountLabel(this.offerValues.loanAmount);
                    this.closingCost = (this.offerValues.loanAmount * (this.offerValues.closingCostPercentage / 100));

                    this.pvif = this.powerOfInterestMonth(this.offerValues.apr, this.offerValues.term);
                    this.monthlyPayment = (-(this.offerValues.apr) * this.offerValues.loanAmount * (this.pvif) / (this.pvif - 1)) * (-1);
                    this.cdr.detectChanges();
                    this.isLoading = false;
                } else {
                    this.router.navigate(["/thankyou"]);
                }

            }, error => {
                console.log("error while getting offer...", error);
            });
        });

    }

    //Update offer
    putOffer() {
        //this.offerValuesObj

        //this.offerSubmitValueObj.applicationId =1;
        //this.offerSubmitValueObj.applicantId = 1;
        this.buttonLoading = true;
        this.offerSubmitValueObj.applicationId = this.applicationId;
        this.offerSubmitValueObj.applicantId = this.applicantId;
        this.offerSubmitValueObj.apr = this.offerValuesObj.apr;
        this.offerSubmitValueObj.closingCost = Math.round(this.closingCost);
        console.log("sending closing cost value...", this.offerSubmitValueObj.closingCost);
        this.offerSubmitValueObj.closingCostPercentage = this.offerValuesObj.closingCostPercentage;
        this.offerSubmitValueObj.intrestRatePercentage = this.offerValuesObj.intrestRatePercentage;
        this.offerSubmitValueObj.loanAmount = Number(this.customLoanAmount.replace(/[^0-9.-]+/g, ""));
        console.log("sending loan amt value....", this.offerSubmitValueObj.loanAmount);
        this.offerSubmitValueObj.monthlyPayment = Math.round(this.monthlyPayment);
        console.log("sending monthly payment value...", this.offerSubmitValueObj.monthlyPayment);
        this.offerSubmitValueObj.offerRateLookUpId = this.offerValuesObj.offerRateLookUpId;
        this.offerSubmitValueObj.status = this.offerValuesObj.status;
        this.offerSubmitValueObj.term = this.offerValuesObj.term;
        this.offerSubmitValueObj.activityStatus = "CONTINUE";
        //console.log("inside put offer()...", this.applicationId, this.applicantId);

        this.offerService.updateSelectedNewOffer(this.offerSubmitValueObj)
            .subscribe(res => {
                //this.keyIdentifier.applicationStatus = res.applicationStatus;
                //this.keyIdentifier.errorMessage = res.message;
                //this.loadingSubject.next(false);
            }, error => {
                //this.sharedKeyDataService.mapErrorCodes(error, this.keyIdentifier);
                //this.loadingSubject.next(false);
                console.log("error while updating offer...", error);
            });
    }
    onSubmitAndExit():
        void {
        this.offerService.setLoanAmount(Number(this.customLoanAmount.replace(/[^0-9.-]+/g, "")));
        this.offerService.setclosingCost(Math.round(this.closingCost));
        this.offerService.setMonthlyPayment(Math.round(this.monthlyPayment));
        this.offerService.setAPR(this.offerValuesObj.apr);
        this.offerService.setClosingCostPercentage(this.offerValuesObj.closingCostPercentage);
        this.offerService.setIntrestRatePercentage(this.offerValuesObj.intrestRatePercentage);
        this.offerService.setOfferRateLookUpId(this.offerValuesObj.offerRateLookUpId);
        this.offerService.setStatus(this.offerValuesObj.status);
        this.offerService.setTerm(this.offerValuesObj.term);
        const dialogRef = this.dialog.open(MyDialogOfferSaveExitComponent, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
    }
}
