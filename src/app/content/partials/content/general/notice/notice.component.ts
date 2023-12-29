/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: notice.component.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'm-notice',
    templateUrl: './notice.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent implements OnInit {
    @Input() classes: any = '';
    @Input() icon: any;

    constructor() {
    }

    ngOnInit() {
        if (this.icon) {
            this.classes += ' m-alert--icon';
        }
    }
}
