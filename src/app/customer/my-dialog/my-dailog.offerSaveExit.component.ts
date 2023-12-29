import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationCreateResponseModel } from '@service/models/applicationCreateResponse.model';
import { OfferNewModel } from '@service/models/offerNew.model';
import { OfferNewSubmitModel } from '@service/models/offerNewSubmit.model';
import { ApplicationService } from '@service/services/server/application.service';
import { OfferService } from '@service/services/server/offer.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { CurrencyPipe } from '@angular/common';
export interface DialogData { }

@Component({
  selector: 'm-my-dialog',
  templateUrl: './my-dialog.saveExit.html',
  styleUrls: ['./my-dialog.component.scss',],
  providers: [CurrencyPipe],
})

export class MyDialogOfferSaveExitComponent implements OnInit {

  offerSubmitValueObj: OfferNewSubmitModel;
  offerValuesObj: OfferNewModel;
  applicationId: number;
  applicantId: number;
  reentryApplicatioId: number;
  reentryApplicantId: number;
  null: number;
  closingCost: number = 0;
  monthlyPayment: number = 0;
  customLoanAmount: any = 0;
  offerValues: any = {};
  pvif: any = 0;

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
    private offerService: OfferService,
    private cdr: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe,

    public dialogRef: MatDialogRef<MyDialogOfferSaveExitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.offerSubmitValueObj = new OfferNewSubmitModel();
    this.offerSubmitValueObj = new OfferNewSubmitModel();
    this.offerValuesObj = new OfferNewModel();
    const response: ApplicationCreateResponseModel = this.applicationService.getApplicationCreateResponse();
    this.reentryApplicatioId = this.applicationService.getApplication();
    this.reentryApplicantId = this.applicationService.getApplicant();
    this.applicationId = response != null ? response.applicationId : this.reentryApplicatioId;
    this.applicantId = response != null ? response.applicantId : this.reentryApplicantId;
    console.log("inside constructor...", this.applicationId, this.applicantId);
  }

  async ngOnInit() {
    await this.loadOffer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  powerOfInterestMonth(apr, months) {
    return Math.pow((1 + apr), months);
  }

  formatLoanAmountLabel(value: number) {
    return this.currencyPipe.transform(Math.round(value), 'USD', '', '1.0-0');
  }

  loadOffer() {
    console.log("in load offer********");
    return new Promise((resolve, reject) => {
      this.offerService.findOfferNewByApplicationId(this.applicationId).subscribe(res => {
        if (res.code == 200) {
          this.offerValuesObj = res;
          this.offerValues = {
            "apr": this.offerValuesObj.apr,
            "loanAmount": this.offerValuesObj.loanAmount,
            "monthlyPayment": this.offerValuesObj.monthlyPayment,
            "term": this.offerValuesObj.term,
            "closingCostPercentage": this.offerValuesObj.closingCostPercentage,
            "closingCost": this.offerValuesObj.closingCost,
            "intrestRatePercentage": this.offerValuesObj.intrestRatePercentage
          }
          this.closingCost = (this.offerValues.loanAmount * (this.offerValues.closingCostPercentage / 100));
          this.customLoanAmount = this.formatLoanAmountLabel(this.offerValues.loanAmount);
          this.pvif = this.powerOfInterestMonth(this.offerValues.apr, this.offerValues.term);
          this.monthlyPayment = (-(this.offerValues.apr) * this.offerValues.loanAmount * (this.pvif) / (this.pvif - 1)) * (-1);
          this.cdr.detectChanges();
        } else {
          console.log("error while getting offer...");
        }

      }, error => {
        console.log("error while getting offer...", error);
      });
    });

  }
  onYesClick(): void {
    this.loadOffer();
    this.offerSubmitValueObj.applicationId = this.applicationId;
    this.offerSubmitValueObj.applicantId = this.applicantId;
    this.offerSubmitValueObj.apr = this.offerService.getAPR();
    this.offerSubmitValueObj.closingCost = this.offerService.getclosingCost();
    console.log("sending closing cost value...", this.offerSubmitValueObj.closingCost);
    this.offerSubmitValueObj.closingCostPercentage = this.offerService.getClosingCostPercentage();
    this.offerSubmitValueObj.intrestRatePercentage = this.offerService.getIntrestRatePercentage();
    this.offerSubmitValueObj.loanAmount = this.offerService.getLoanAmount();
    console.log("sending loan amt value....", this.offerSubmitValueObj.loanAmount);
    this.offerSubmitValueObj.monthlyPayment = this.offerService.getMonthlyPayment();
    console.log("sending monthly payment value...", this.offerSubmitValueObj.monthlyPayment);
    this.offerSubmitValueObj.offerRateLookUpId = this.offerService.getOfferRateLookUpId();
    this.offerSubmitValueObj.status = this.offerService.getStatus();
    this.offerSubmitValueObj.term = this.offerService.getTerm();
    this.offerSubmitValueObj.activityStatus = "SAVE_AND_EXIT";
    this.offerService.updateSelectedNewOffer(this.offerSubmitValueObj).subscribe(res => {
      let url = "https://peoplefund.org"
      window.location.href = url;
    }, error => {
      console.log("error while updating offer...", error);
    });
    this.dialogRef.close();
  }

}
