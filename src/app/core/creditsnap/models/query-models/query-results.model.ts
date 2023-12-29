/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: query-results.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class QueryResultsModel {
    // fields
    items: any[];
    totalCount: number;
    errorMessage: string;

    constructor(_items: any[] = [], _errorMessage: string = '') {
        this.items = _items;
        this.totalCount = _items.length;
    }
}
