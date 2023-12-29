import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PhoneNumberPipe } from '@core/pipes/phone-number.pipe';
import { MyDialogReviewSaveExitComponent } from '@customer/my-dialog/my-dialog.reviewSaveExit.component';
import { CustomerDetailsService } from '@customer/customer-details.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

const apiUrl = environment.apiUrl;
@Component({
  selector: 'm-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe, UpperCasePipe, PhoneNumberPipe]
})
export class ReviewComponent implements OnInit, OnDestroy {

  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  submitButtonText: string;
  isLoading = true;
  buttonLoading = false;
  public files: any[] = [];
  attachmentOne: string = "imageone.png";
  attachmentTwo: string = "imageTwo.png";
  attachmentThree: string = "imageThree.png";
  attachmentFour: string = "imageFour.png";
  imageOne = 0;
  imageTwo = 0;
  imageThree = 0;
  imageFour = 0;
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
  http: any;
  percentDone: number;
  imageSrc: any;
  sanitizer: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private customerDetailService: CustomerDetailsService) {
    this.submitButtonText = 'View My Offers';
  }
  ngOnInit() {
    this.isLoading = true;
  }
 
  onFileChange(pFileList: File[]){
    this.files = Object.keys(pFileList).map(key => pFileList[key]);

    // Below code usefull for showing the upload image progress bar 
    this.http.post("").subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
      }
      if (event.type === HttpEventType.Response) {
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event['body']));
      }
    }
  );
  }
 

  onSubmit(): void {
    this.router.navigate(["/reviewdata"]);
  }
  public postData():void{

  }


  startProgressBarAction() {
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Processing ...';
    this.barButtonOptions.mode = 'indeterminate';
  }


  ngOnDestroy(): void {
    
  }

  onSubmitAndExit():
    void {
    this.customerDetailService.setCustomerDetail("");
    const dialogRef = this.dialog.open(MyDialogReviewSaveExitComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
  }

}