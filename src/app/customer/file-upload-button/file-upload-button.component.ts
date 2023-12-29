import { Component, EventEmitter, Input, Output ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteDialogComponent } from '@customer/confirm-delete-dialog/confirm-delete-dialog.component';
import {ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'm-file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss']
})
export class FileUploadButtonComponent {
  fileInfo: string;
  fileDetails: File;
  @Output() fileUploadHandler = new EventEmitter();
  @Input() uploadSuccess = false;
  @Input() sizeLimit = 0;
  fileError = null;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor( public dialog: MatDialog, private cd: ChangeDetectorRef,private router: Router,){

  }

  /**
   * Called when the value of the file input changes, i.e. when a file has been
   * selected for upload.
   *
   * @param input the file input HTMLElement
   */
  onFileSelect(input: HTMLInputElement): void {

    /**
     * Format the size to a human readable string
     *
     * @param bytes
     * @returns the formatted string e.g. `105 kB` or 25.6 MB
     */
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;

      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }

      return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }
    

    this.fileError = null;
    const file = input.files[0];
    if (!file) {
      this.fileInfo = '';
      return;
    }
    console.log('file.size');
    console.log(file.size);
    // convertion of bytes to respective units
    console.log(formatBytes(file.size))
    if (this.sizeLimit !== 0 && file.size > this.sizeLimit) {
      const limit = formatBytes(this.sizeLimit);
      this.fileError = `File size exceeded the limit(${limit})`;
      return;
    }
    this.fileInfo = `${file.name} (${formatBytes(file.size)})`;
    this.fileUploadHandler.emit(file);
  }

  removeFile(msg): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '390px',
        data : {
          message : 'Are you sure to delete this file?',
          fileName: msg
        }
    });
    dialogRef.afterClosed().subscribe(result => {
    if ( `${result}` == '200') {
        this.fileUploadHandler.emit('');
        this.fileInfo = '';
      }
    });
  }
}
