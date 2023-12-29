/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: portlet-child.component.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as objectPath from 'object-path';

@Component({
    selector: 'm-portlet-child',
    templateUrl: './portlet-child.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortletChildComponent implements AfterViewInit {
    @Input() options: any;

    portletHead: Boolean = true;

    @ViewChild('mPortlet') elPortlet: ElementRef;
    @ViewChild('mPortletHead') elHead: ElementRef;
    @ViewChild('mPortletBody') elBody: ElementRef;
    @ViewChild('mPortletFooter') elFooter: ElementRef;

    constructor() {
    }

    ngAfterViewInit(): void {

        console.log(' mportlet headAuto: ', objectPath.get(this.options, 'headAuto'));
        if (objectPath.get(this.options, 'headAuto')) {
            console.log(' m-portlet head auto');
            this.elHead.nativeElement.style.height = 'auto';
        }
        this.portletHead = objectPath.get(this.options, 'portletHead');
        if (this.portletHead === undefined) {
            this.portletHead = true;
        }
        // hide portlet footer if no content
        if (this.elFooter && this.elFooter.nativeElement.children.length === 0) {
            this.elFooter.nativeElement.style.display = 'none';
            this.elPortlet.nativeElement.classList.add('m-portlet--full-height');
        }
        // hide portlet header tools if no content
        if (!this.portletHead) {
            this.elHead.nativeElement.style.display = 'none';
        }
    }
}
