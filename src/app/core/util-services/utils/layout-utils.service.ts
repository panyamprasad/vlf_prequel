/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: layout-utils.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActionNotificationComponent} from '../../_shared/action-natification/action-notification.component';

export enum MessageType {
    Create,
    Read,
    Update,
    Delete,
    Error
}

@Injectable()
export class LayoutUtilsService {
    constructor(private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    // SnackBar for notifications
    showActionNotification(
        message: string,
        type: MessageType = MessageType.Create,
        duration: number = 10000,
        showCloseButton: boolean = true,
        showUndoButton: boolean = false,
        undoButtonDuration: number = 3000,
        verticalPosition: 'top' | 'bottom' = 'top'
    ) {
        return this.snackBar.openFromComponent(ActionNotificationComponent, {
            duration: duration,
            data: {
                message,
                snackBar: this.snackBar,
                showCloseButton: showCloseButton,
                showUndoButton: showUndoButton,
                undoButtonDuration,
                verticalPosition,
                type,
                action: 'Undo'
            },
            verticalPosition: verticalPosition
        });
    }
}
