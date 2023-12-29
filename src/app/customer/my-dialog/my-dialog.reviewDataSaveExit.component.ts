import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FindApplicationService } from '@service/services/findapplication.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

export interface DialogData { }

@Component({
  selector: 'm-my-dialog',
  templateUrl: './my-dialog.saveExit.html',
  styleUrls: ['./my-dialog.component.scss',]
})

export class MyDialogReviewDataSaveExitComponent implements OnInit {

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
    private findapplicationService: FindApplicationService,
    public dialogRef: MatDialogRef<MyDialogReviewDataSaveExitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.onSubmit();
    this.dialogRef.close();
  }

  completeProgressBarAction() {
    this.continueButtonOptions.active = false;
    this.continueButtonOptions.text = 'Submit';
  }

  onSubmit() {
    const payload = {

    };
    this.findapplicationService.completeApplicationBySaveExit(payload)
      .subscribe(data => {
        this.findapplicationService.setApplicationFindResponse(data);
        if (data.code == 200) {
          let url = "https://peoplefund.org"
          window.location.href = url;
        } else {
          this.completeProgressBarAction();
        }
      },
        err => {
          this.completeProgressBarAction();
          console.error("responce%$$$$$$$$$$$$$$$$$$$$$" + err);
        });

  }

}
