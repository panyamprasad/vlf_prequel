/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: warranty.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class WarrantyModel {
    id: number;
    vehicleId: number;
    planId: number;
    plan: string;
    price: number;
    term: number;
    termType: string;
    opted: Boolean;
    description: string;

    clear() {
        this.vehicleId = 0;
        this.termType = '';
        this.price = 0;
    }
}
