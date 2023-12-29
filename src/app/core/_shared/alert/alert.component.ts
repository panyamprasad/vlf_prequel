/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: alert.component.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'm-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

    @Input() type: 'primary | accent | warn';
    @Input() duration: number = 0;
    @Input() showCloseButton: boolean = true;
    @Output() close = new EventEmitter<boolean>();

    alertShowing: boolean = true;

    ngOnInit() {
        if (this.duration === 0) {
            return;
        }

        setTimeout(() => {
            this.closeAlert();
        }, this.duration);
    }

    closeAlert() {
        this.close.emit();
    }
}
