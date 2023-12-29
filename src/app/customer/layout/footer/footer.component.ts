/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: footer.component.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LayoutConfigService} from '../../../core/util-services/layout-config.service';
import * as objectPath from 'object-path';

@Component({
    selector: 'm-customer-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
    @HostBinding('class') classes = 'm-grid__item m-footer';

    footerContainerClass$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private configService: LayoutConfigService) {
        this.configService.onLayoutConfigUpdated$.subscribe(model => {
            const config = model.config;

            let pageBodyClass = '';
            const selfLayout = objectPath.get(config, 'self.layout');
            if (selfLayout === 'boxed' || selfLayout === 'wide') {
                pageBodyClass += 'm-container--responsive m-container--xxl';
            } else {
                pageBodyClass += 'm-container--fluid';
            }
            this.footerContainerClass$.next(pageBodyClass);
        });
    }

    ngOnInit(): void {
    }

    homePage(){
        let url ="https://peoplefund.org/"
        window.location.href = url;
    }

}
