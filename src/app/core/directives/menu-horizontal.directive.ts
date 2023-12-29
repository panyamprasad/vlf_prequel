/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: menu-horizontal.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
    selector: '[mMenuHorizontal]'
})
export class MenuHorizontalDirective implements AfterViewInit, OnDestroy {
    menu: any;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        // init the mMenu plugin
        this.menu = new mMenu(this.el.nativeElement, {
            submenu: {
                desktop: 'dropdown',
                tablet: 'accordion',
                mobile: 'accordion'
            },
            accordion: {
                slideSpeed: 200, // accordion toggle slide speed in milliseconds
                autoScroll: true, // enable auto scrolling(focus) to the clicked menu item
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });
    }

    ngOnDestroy(): void {
    }
}
