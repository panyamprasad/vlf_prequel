/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: scroll-top.component.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-scroll-top',
    templateUrl: './scroll-top.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
