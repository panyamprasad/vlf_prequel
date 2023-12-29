import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MyDialogComponent } from './my-dialog.component';

export interface DialogData { }

@Component({
  selector: 'm-my-dialog',
  templateUrl: './my-dialog.html',
  styleUrls: ['./my-dialog.component.scss',]
})

export class MyDialogCancelComponent implements OnInit {

  ownerShipCancelButton: MatProgressButtonOptions = {
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

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
