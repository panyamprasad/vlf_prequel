/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: menu-aside-toggle.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
    selector: '[mMenuAsideToggle]'
})
export class MenuAsideToggleDirective implements AfterViewInit, OnDestroy {
    toggle: any;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.toggle = new mToggle(this.el.nativeElement, {
            target: 'body',
            targetState: 'm-brand--minimize m-aside-left--minimize',
            togglerState: 'm-brand__toggler--active'
        });

        this.el.nativeElement.addEventListener('toggle', e => {
            console.log(e);
        });
    }

    ngOnDestroy(): void {
    }
}
