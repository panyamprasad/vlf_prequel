/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: vendor.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class VendorModel {
    id: number;
    vendorName: string;
    version: number;

    clear() {
        this.id = 0;
        this.vendorName = '';
        this.version = 0;
    }
}
