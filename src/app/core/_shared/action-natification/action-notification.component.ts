/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: action-notification.component.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';


@Component({
    selector: 'm-action-natification',
    templateUrl: './action-notification.component.html',
    changeDetection: ChangeDetectionStrategy.Default

})
export class ActionNotificationComponent implements OnInit {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    }

    ngOnInit() {
        if (!this.data.showUndoButton || (this.data.undoButtonDuration >= this.data.duration)) {
            return;
        }

        this.delayForUndoButton(this.data.undoButtonDuration).subscribe(() => {
            this.data.showUndoButton = false;
        });
    }

    delayForUndoButton(timeToDelay) {
        return of('').pipe(delay(timeToDelay));
    }

    public onDismissWithAction() {
        this.data.snackBar.dismiss();
    }

    public onDismiss() {
        this.data.snackBar.dismiss();
    }
}
