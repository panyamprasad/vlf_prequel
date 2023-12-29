import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '@service/services/server/application.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

export interface DialogData { }

@Component({
  selector: 'm-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss',]
})

export class MyDialogComponent implements OnInit {

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
    public applicationService: ApplicationService,
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    let code = 102;
    this.applicationService.setErrorCode(code);
    this.router.navigate(["thankyou"]);
    this.dialogRef.close();
  }
}
