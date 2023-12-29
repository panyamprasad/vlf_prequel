/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: creditapps.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {ApplicationModel} from './application.model';

export class CreditApplicationsModel {
    _apps: ApplicationModel[];

    constructor() {
        this._apps = [];
    }

    clear() {

    }
}
