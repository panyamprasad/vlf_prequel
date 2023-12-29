import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApplicationModel, BusinessModel, CollateralModel, KeyIdentifierModel, OfferNewModel, ResidenceModel } from '@service/models';
import { AboutCustomerModel, AddressModel, ApplicantModel, ApplicationCreateResponseModel } from '@service/models';
import { MatBarButtonComponent } from 'mat-progress-buttons';
import { ApplicationService, OfferUtilService } from '@service/services';
import { ReviewService } from '@service/services/server/review.service';
import { PhoneNumberPipe } from '@core/pipes/phone-number.pipe';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AboutService } from 'app/services/about.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessDetailService } from '@customer/business-detail.service';
import { ApplicantDetailService } from '@customer/applicant-detail.service';
import { ReviewDataModel } from '@service/models/reviewdata.model';
import { environment } from '@env/environment';
import { NgForm } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ApplicationStatusEnum } from '../../core/creditsnap/enum/process-state.enum';
import { FindApplicationService } from '@service/services/findapplication.service';
import { MyDialogReviewDataSaveExitComponent } from '@customer/my-dialog/my-dialog.reviewDataSaveExit.component';
import { MatDialog } from '@angular/material';
import { AppConfigService } from '@service/config/app-config.service';
import { ConsentModel } from '@service/models';
@Component({
	selector: 'm-reviewdata',
	templateUrl: './reviewdata.component.html',
	styleUrls: ['./reviewdata.component.scss'],
	providers: [DatePipe, UpperCasePipe, PhoneNumberPipe]
})
export class ReviewdataComponent implements OnInit {

	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable();
	appConfig: any;
    showConsent2 = false;
    consent: ConsentModel;
	isBusinessHasTaxId: false;
	applicant_name: string;
	keyIdentifier: KeyIdentifierModel;
	application: ApplicationModel;
	applicant: ApplicantModel;
	customer: AboutCustomerModel;
	address: AddressModel;
	business: BusinessModel;
	offer: OfferNewModel = new OfferNewModel();
	collateral: CollateralModel;
	residence: ResidenceModel;
	productName: string;
	income: number;
	minDate = new Date();
	maxDate = new Date();
	@ViewChild('f') f: NgForm;
	@ViewChild('mScrollTop') elScrollTop: ElementRef;
	scrollTop: any;
	submitButtonText: string;
	militaryActiveDutyIndicator: string;
	citizenInd: any;
	subscription: Subscription;
	currentStep = 1;
	percentDone: number;
	uploadSuccess: boolean;
	businessTypeFlag: boolean = false;
	aboutBusiness: BusinessModel;
	posts: any;
	loanPurposePopulated: boolean = false;
	users: any;
	reviewdata: ReviewDataModel = {};
	loanAmount: any;
	formattedDateOfBirth: any;
	formattedEstablishedDate: any;
	einNumber: any;
	ssnNumber: any;
	monthlyPayment: any;
	closingCost: any;
	intrestRatePercentage: any;
	veteranStatus: any;
	num : number;
    null : number;
	code : number;
	isLoading = true;
	buttonLoading = false;
	@ViewChild('splashScreen', { read: ElementRef })
	splashScreen: ElementRef;
	splashScreenImage = '/assets/images/logo/pf_lg.png';
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
	gender: any;
	constructor(
		public dialog: MatDialog,
		private applicationService: ApplicationService,
		private activatedRoute: ActivatedRoute,
		private reviewService: ReviewService,
		private phoneNumberPipe: PhoneNumberPipe,
		private uppercasePipe: UpperCasePipe,
		private aboutService: AboutService,
		private http: HttpClient,
		private businessDetailService: BusinessDetailService,
		private applicantDetailService: ApplicantDetailService,
		private elRef: ElementRef,
		private router: Router,
		private sharedKeyDataService: SharedkeyDataService,
        private _changeDetectorRef: ChangeDetectorRef,
		private findapplicationService: FindApplicationService) { 
			this.code = this.applicationService.getYellowApplication();
		}

	ngOnInit() {
		this.consent = new ConsentModel();
		this.appConfig = AppConfigService.config;
		this.completeProgressBarAction();
		this.initCustomer();
		this.getData();
	}

	initCustomer() {
		this.business = new BusinessModel();
		this.applicant = new ApplicantModel();
		this.application = new ApplicationModel();
		this.address = new AddressModel();
		this.customer = new AboutCustomerModel();
		this.offer = new OfferNewModel();
	}
	getData() {
		this.isLoading = true;
		this.barButtonOptions.active;
		this._changeDetectorRef.markForCheck();
		const response: ApplicationCreateResponseModel = this.applicationService.getApplicationCreateResponse();
		this.num = this.applicationService.getApplication();
		if (_.get(response, 'applicationId') || response != this.null)
		{
			const applicationId: number = response !=null? response.applicationId:this.num;
			// const businessUrl = environment.apiUrl + '/application/get/' + applicationId;
			const businessUrl = environment.apiUrl + '/application/' + applicationId;
			const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
			this.loadingSubject.next(true);
			this.http.get(businessUrl, options).subscribe(
				(data: any) => {
					this.business = data.applicationVO;
					this.applicant = data.applicationVO.applicantVO;
					if (!_.isEmpty(data.applicationVO.offerVO))
					{
						this.offer = data.applicationVO.offerVO;
					}
					this.business.addressVO = data.applicationVO.addressVO;
					this.applicant.addressVO = data.applicationVO.applicantVO.addressVO;
					const custloanAmount = Number(parseFloat((this.offer.loanAmount)).toFixed(2)).toLocaleString('en');
					if (this.business.businessType === 'SP' || this.business.businessType === 'General Partnership')
					{
						this.businessTypeFlag = true;
					}

					this.einNumber = this.applicant.ein;
					this.ssnNumber = this.applicant.ssn;
					this.applicant.ein = this.getFormattedEin(this.applicant.ein);
					this.applicant.ssn = this.getFormattedSsn(this.applicant.ssn);
					this.offer.monthlyPayment = '$' + this.offer.monthlyPayment;
					this.offer.loanAmount = '$' + this.offer.loanAmount;
					this.offer.closingCost = '$' + this.offer.closingCost;
					this.offer.intrestRatePercentage = this.offer.intrestRatePercentage + ' %';
					this.loanAmount = custloanAmount;
					this.formattedEstablishedDate = this.getFormattedDates(this.business.establishedDate);
					this.formattedDateOfBirth = this.getFormattedDates(this.applicant.dob);
					this.business.establishedDate = this.formattedEstablishedDate;
					this.applicant.gender = this.getGenderDetails(this.applicant.gender);
					this.applicant.dob = this.formattedDateOfBirth;
					this.veteranStatus = this.applicant.status;
					this.applicant.ownershipPercentage = this.applicant.ownershipPercentage + '%';
					this.applicant.primaryPhone = this.phoneNumberPipe.transform(this.applicant.primaryPhone);
					this.isLoading = false;
					this.barButtonOptions.active;
					this._changeDetectorRef.markForCheck();
				}
				
				);
				this._changeDetectorRef.markForCheck();
			//	this.barButtonOptions.active;
		}else{
			const applicationId: number =this.num;
			// const businessUrl = environment.apiUrl + '/application/get/' + applicationId;
			const businessUrl = environment.apiUrl + '/application/' + applicationId;
			const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
			this.loadingSubject.next(true);
			this.http.get(businessUrl, options).subscribe(
				(data: any) => {
					this.business = data.applicationVO;
					this.applicant = data.applicationVO.applicantVO;
					if (!_.isEmpty(data.applicationVO.offerVO))
					{
						this.offer = data.applicationVO.offerVO;
					}
					this.business.addressVO = data.applicationVO.addressVO;
					this.applicant.addressVO = data.applicationVO.applicantVO.addressVO;
					const custloanAmount = Number(parseFloat((this.offer.loanAmount)).toFixed(2)).toLocaleString('en');
					if (this.business.businessType === 'SP' || this.business.businessType === 'General Partnership')
					{
						this.businessTypeFlag = true;
					}

					this.einNumber = this.applicant.ein;
					this.ssnNumber = this.applicant.ssn;
					this.applicant.ein = this.getFormattedEin(this.applicant.ein);
					this.applicant.ssn = this.getFormattedSsn(this.applicant.ssn);
					this.offer.monthlyPayment = '$' + this.offer.monthlyPayment;
					this.offer.loanAmount = '$' + this.offer.loanAmount;
					this.offer.closingCost = '$' + this.offer.closingCost;
					this.offer.intrestRatePercentage = this.offer.intrestRatePercentage + ' %';
					this.loanAmount = custloanAmount;
					this.formattedEstablishedDate = this.getFormattedDates(this.business.establishedDate);
					this.formattedDateOfBirth = this.getFormattedDates(this.applicant.dob);
					this.business.establishedDate = this.formattedEstablishedDate;
					this.applicant.gender = this.getGenderDetails(this.applicant.gender);
					this.applicant.dob = this.formattedDateOfBirth;
					this.veteranStatus = this.applicant.status;
					this.applicant.ownershipPercentage = this.applicant.ownershipPercentage + '%';
					this.applicant.primaryPhone = this.phoneNumberPipe.transform(this.applicant.primaryPhone);
					this.isLoading = false;
					this.barButtonOptions.active;
					this._changeDetectorRef.markForCheck();
				});
		}
		this.barButtonOptions.active;
		this.barButtonSaveAndExit.active;
		this._changeDetectorRef.markForCheck();
	}

	getGenderDetails(gender: string): string {
		console.log(' gender=> ', gender);
		switch (gender)
		{
			case 'M':
				return 'Male';
			case 'F':
				return 'Female';
			case 'O':
				return 'Other';
			case 'N':
				return 'Do NOT wish to specify';
		}
		return 'Do NOT wish to specify';
	}
	getFormattedDates(eDate): any {
		const established = new Date(eDate);
		let dd = established.getDate();
		let mm = established.getMonth() + 1;
		const yyyy = established.getFullYear();
		const formattedDate = this.minTwoDigits(mm) + '/' + this.minTwoDigits(dd) + '/' + yyyy;
		return formattedDate;
	}
	getFormattedEin(ein): any {
		var new_string = ein.replace(/-|\s/g, "");
		let einSliced = this.einNumber.slice(-4);
		let countNum = '';
		console.log('einSliced.length', einSliced.length);
		console.log('ein', ein);
		console.log('new_stringn', new_string);
		for (let i = (new_string.length) - 4; i > 0; i--)
		{
			console.log('i = ', i);
			if (i === 3)
			{
				countNum += '-';
			}
			countNum += 'X';
		}
		return countNum + einSliced;
	}
	getFormattedSsn(ssn): any {
		var new_string = ssn.replace(/-|\s/g, "");
		let einSliced = this.ssnNumber.slice(-4);
		let num = (new_string.length) - 4; // 5
		let countNum = '';
		for (let i = num; i > 0; i--)
		{
			console.log('i = ', i);
			if (i === 2 || i === 0)
			{
				countNum += '-';
			}
			countNum += 'X';
		}
		return countNum + '-' + einSliced;
	}
	minTwoDigits(n) {
		return (n < 10 ? '0' : '') + n;
	}

	completeProgressBarAction() {
		// console.log(' completeProgressBarAction .. completed');
		this.barButtonOptions.active = false;
		this.barButtonOptions.text = 'Submit';
	}
	startProgressBarAction() {
		//  console.log(' startProgressBarAction .. started');
		this.barButtonOptions.active = true;
		this.barButtonOptions.text = 'Processing ...';
		this.barButtonOptions.mode = 'indeterminate';
	}
	onSubmit() {
		this.buttonLoading = true;
		const payload = {
			
			};
			this.findapplicationService.completeApplication(payload)
        .subscribe(data => {
            this.findapplicationService.setApplicationFindResponse(data);
            if(data.code==200){
            	this.router.navigate(["/thankyou"]);
            }else {
                this.completeProgressBarAction();
            }
        },
            err => {
                this.completeProgressBarAction();
                console.error("responce%$$$$$$$$$$$$$$$$$$$$$"+err);
            });
		
	}
	scrollToField() {
		const invalid = this.elRef.nativeElement.querySelector('.ng-invalid');
		if (invalid)
		{
			invalid[0].scrollIntoView();
		}
	}
	onSubmitAndExit():
		void {
	const dialogRef = this.dialog.open(MyDialogReviewDataSaveExitComponent, {
		width: '400px',
	});
	dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
	}
}
