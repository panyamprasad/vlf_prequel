/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: page-config.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PagesConfig} from '../../config/pages';
import {Router} from '@angular/router';
import * as objectPath from 'object-path';

@Injectable()
export class PageConfigService {
    public configModel: PagesConfig = new PagesConfig();
    public onPageUpdated$: BehaviorSubject<PagesConfig> = new BehaviorSubject(
        this.configModel
    );

    constructor(private router: Router) {
    }

    setModel(menuModel: PagesConfig) {
        this.configModel = Object.assign(this.configModel, menuModel);
        this.onPageUpdated$.next(this.configModel);
    }

    getCurrentPageConfig(): any {
        return objectPath.get(
            this.configModel,
            'config.' + this.router.url.substring(1).replace(/\//g, '.')
        );
    }
}
