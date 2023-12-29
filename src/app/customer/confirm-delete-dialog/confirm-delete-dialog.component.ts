import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { result } from 'lodash';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Subject, Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

export interface DialogData { }

@Component({
  selector: 'm-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();
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
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('200');
  }

}
