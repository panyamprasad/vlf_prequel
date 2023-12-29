/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: layout-ref.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LayoutRefService {
    layoutRefs$: BehaviorSubject<any> = new BehaviorSubject<any>({});
    layoutRefs: any = {};

    constructor() {
    }

    addElement(name, element) {
        const obj = {};
        obj[name] = element;
        this.layoutRefs$.next(Object.assign(this.layoutRefs, obj));
    }
}
