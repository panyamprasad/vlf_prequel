/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: quick-sidebar-offcanvas.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
    selector: '[mQuickSidebarOffcanvas]'
})
export class QuickSidebarOffcanvasDirective
    implements AfterViewInit, OnDestroy {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        const offcanvas = new mOffcanvas(this.el.nativeElement, {
            overlay: true,
            baseClass: 'm-quick-sidebar',
            closeBy: 'm_quick_sidebar_close',
            toggleBy: 'm_quick_sidebar_toggle'
        });
    }

    ngOnDestroy(): void {
    }
}
