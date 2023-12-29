/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: menu-aside-offcanvas.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
    selector: '[mMenuAsideOffcanvas]'
})
export class MenuAsideOffcanvasDirective implements AfterViewInit, OnDestroy {
    menuOffcanvas: any;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        // check class for the offcanvas option
        // tslint:disable-next-line:max-line-length
        const offcanvasClass = mUtil.hasClass(this.el.nativeElement, 'm-aside-left--offcanvas-default') ? 'm-aside-left--offcanvas-default' : 'm-aside-left';

        // init the mOffcanvas plugin
        this.menuOffcanvas = new mOffcanvas(this.el.nativeElement, {
            baseClass: offcanvasClass,
            overlay: true,
            closeBy: 'm_aside_left_close_btn',
            toggleBy: {
                target: 'm_aside_left_offcanvas_toggle',
                state: 'm-brand__toggler--active'
            }
        });
    }

    ngOnDestroy(): void {
    }
}
