/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: errors.module.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ErrorsService} from './errors-service/errors.service';
import {ErrorsComponent} from './errors-component/errors.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        ErrorsComponent
    ],
    providers: [
        ErrorsService
    ]
})
export class ErrorsModule {
}
