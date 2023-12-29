/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: scroll-top.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
    selector: '[mScrollTop]'
})
export class ScrollTopDirective implements AfterViewInit, OnDestroy {
    scrollTop: any;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        // init mScrollTop plugin
        this.scrollTop = new mScrollTop(this.el.nativeElement, {
            offset: 300,
            speed: 600
        });
    }

    ngOnDestroy(): void {
    }
}
