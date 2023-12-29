import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MyDialogComponent } from './my-dialog.component';

export interface DialogData { }

@Component({
  selector: 'm-my-dialog',
  templateUrl: './my-dialog.customerState.html',
  styleUrls: ['./my-dialog.component.scss',]
})

export class MyDialogCustomerCancelComponent implements OnInit {

  continueButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Continue ',
    buttonColor: 'accent',
    barColor: '#043673',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false
  };

  constructor(private router: Router,
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onYesClick(): void {
    this.dialogRef.close();
  }
}
