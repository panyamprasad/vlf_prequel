import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { environment } from '@env/environment';
import { ApplicationStatusEnum } from '@service/enum/process-state.enum';
import { AboutCustomerModel } from '@service/models';
import { AddressModel } from '@service/models/address.model';
import { ApplicantModel } from '@service/models/applicant.model';
import { ApplicationModel } from '@service/models/application.model';
import { ApplicationCreateResponseModel } from '@service/models/applicationCreateResponse.model';
import { BusinessModel } from '@service/models/business.model';
import { KeyIdentifierModel } from '@service/models/key-identifier.model';
import { ApplicationService } from '@service/services/server/application.service';
import { ReviewService } from '@service/services/server/review.service';
import _ from 'lodash';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { UpperCasePipe } from '@angular/common';
import { CustomerDetailsService } from '@customer/customer-details.service';
export interface DialogData { }
const apiUrl = environment.apiUrl;
@Component({
  selector: 'm-my-dialog',
  templateUrl: './my-dialog.saveExit.html',
  styleUrls: ['./my-dialog.component.scss',],
  providers: [UpperCasePipe]
})

export class MyDialogReviewSaveExitComponent implements OnInit {
  rentryApplicationId: number;
  rentryApplicantId: number;
  customer: AboutCustomerModel;
  address: AddressModel;
  business: BusinessModel;
  application: ApplicationModel;
  applicant: ApplicantModel;
  keyIdentifier: KeyIdentifierModel;

  currentStep = 1;

  continueButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Yes',
    buttonColor: 'accent',
    barColor: '#043673',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false
  };

  cancelButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'No',
    buttonColor: 'accent',
    barColor: '#043673',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false
  };

  constructor(private router: Router,
    private applicationService: ApplicationService,
    private reviewService: ReviewService,
    private uppercasePipe: UpperCasePipe,
    private sharedKeyDataService: SharedkeyDataService,
    private customerDetailService: CustomerDetailsService,
    public dialogRef: MatDialogRef<MyDialogReviewSaveExitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.customer = this.customerDetailService.getCustomerDetail();
  }

  ngOnInit() {
    this.initCustomer();
  }

  initCustomer() {
    this.business = new BusinessModel();
    this.applicant = new ApplicantModel();
    this.application = new ApplicationModel();
    this.address = new AddressModel();
    this.customer = this.customerDetailService.getCustomerDetail();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.postData();
    this.dialogRef.close();
  }



  postData() {
    const businessUrl = apiUrl + '/application/update';
    const response: ApplicationCreateResponseModel = this.applicationService.getApplicationCreateResponse();
    this.rentryApplicationId = this.applicationService.getApplication();
    this.rentryApplicantId = this.applicationService.getApplicant();
    let applicationId = null;
    if (_.get(response, 'applicationId')) {
      applicationId = response.applicationId;
    } else {
      applicationId = this.rentryApplicationId;
    }
    let applicantId = null;
    if (_.get(response, 'applicantId')) {
      applicantId = response.applicantId;
    } else {
      applicantId = this.rentryApplicantId;
    }
    let revenue = this.customer.annualRevenue ? this.customer.annualRevenue : "";
    if (/^\d+$/.test(revenue)) {
      revenue = revenue;
    }
    else {
      revenue = revenue.replace(/\,/g, '');
      revenue = parseInt(revenue, 10);
    }
    const industryName = this.customer.industryName;
    const annualRevenue = revenue;
    const jobTitle = this.customer.jobTitle;
    const race = this.customer.race;
    const isSpouseVeteran = this.customer.isSpouseVeteran;
    const ethnicity = this.customer.ethnicity;
    const businessPlanQuestion1 = this.customer.businessPlanQuestion1;
    const businessPlanQuestion2 = this.customer.businessPlanQuestion2;
    const businessPlanQuestion3 = this.customer.businessPlanQuestion3;
    const activityStatus = "SAVE_AND_EXIT";
    const payload = {
      applicationId,
      industryName,
      annualRevenue,
      applicantVO: {
        applicantId,
        jobTitle,
        race,
        isSpouseVeteran,
        ethnicity
      },
      businessQuestionAndAnswerVOS: [
        {
          businessQuestionNo: 1,
          businessAnswer: businessPlanQuestion1
        },
        {
          businessQuestionNo: 2,
          businessAnswer: businessPlanQuestion2
        },
        {
          businessQuestionNo: 3,
          businessAnswer: businessPlanQuestion3
        }
      ],
      activityStatus
    };
    this.reviewService.saveApplication(payload)
      .subscribe(data => {
        this.applicationService.setApplicationCreateResponse(data);
        let url = "https://peoplefund.org"
        window.location.href = url;
      },
        err => {
          console.error(err);
        });
  }
}
