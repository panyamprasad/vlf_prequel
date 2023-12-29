/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: layout-config-storage.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {LayoutConfig} from '../../config/layout';
import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';

@Injectable()
export class LayoutConfigStorageService {
    constructor(private utils: UtilsService) {
    }

    saveConfig(layoutConfig: LayoutConfig): void {
        if (layoutConfig != null) {
            // config storage
            localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
        }
    }

    getSavedConfig(): Observable<LayoutConfig> {
        const config: any = localStorage.getItem('layoutConfig');
        try {
            return of(JSON.parse(config));
        } catch (e) {
        }
    }

    loadConfig(): Observable<LayoutConfig> {
        return this.getSavedConfig().pipe(
            map(config => {
                return Object.assign({}, new LayoutConfig(), config);
            })
        );
    }

    resetConfig(): void {
        localStorage.removeItem('layoutConfig');
    }
}
