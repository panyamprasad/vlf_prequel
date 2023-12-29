/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: portlet-child.module.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../../../../core/core.module';
import {PortletChildComponent} from './portlet-child.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule
    ],
    declarations: [PortletChildComponent],
    exports: [PortletChildComponent]
})
export class PortletChildModule {
}
