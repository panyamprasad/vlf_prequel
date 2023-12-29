/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: quick-search.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({
    selector: '[mQuickSearch]'
})
export class QuickSearchDirective implements AfterViewInit, OnDestroy {
    quicksearch: any;

    public onSearch$: Subject<any> = new Subject<any>();

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        const mode = this.el.nativeElement.getAttribute('m-quicksearch-mode');
        // init mQuicksearch plugin
        this.quicksearch = new mQuicksearch(this.el.nativeElement, {
            mode: mode, // quick search type
            minLength: 1
        });

        this.quicksearch.on('search', plugin => {
            this.onSearch$.next(plugin);
        });
    }

    ngOnDestroy(): void {
    }
}
