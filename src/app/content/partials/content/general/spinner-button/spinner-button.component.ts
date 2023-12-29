/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: spinner-button.component.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Component, Input, OnInit} from '@angular/core';
import {SpinnerButtonOptions} from './button-options.interface';

@Component({
    selector: 'm-spinner-button',
    templateUrl: './spinner-button.component.html',
    styleUrls: ['./spinner-button.component.scss'],
})
export class SpinnerButtonComponent implements OnInit {
    @Input() options: SpinnerButtonOptions;

    constructor() {
    }

    ngOnInit() {
    }
}
