/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: menu-config.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';
import {MenuConfig} from '../../config/menu';

@Injectable()
export class MenuConfigService {
    public configModel: MenuConfig = new MenuConfig();
    public onMenuUpdated$: BehaviorSubject<MenuConfig> = new BehaviorSubject(
        this.configModel
    );
    menuHasChanged: any = false;

    constructor(private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe(event => {
                if (this.menuHasChanged) {
                    this.resetModel();
                }
            });
    }

    setModel(menuModel: MenuConfig) {
        this.configModel = Object.assign(this.configModel, menuModel);
        this.onMenuUpdated$.next(this.configModel);
        this.menuHasChanged = true;
    }

    resetModel() {
        this.configModel = new MenuConfig();
        this.onMenuUpdated$.next(this.configModel);
        this.menuHasChanged = false;
    }
}
