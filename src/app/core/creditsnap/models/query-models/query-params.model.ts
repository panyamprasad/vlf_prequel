/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: query-params.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class QueryParamsModel {
    // fields
    filter: any;
    sortOrder: string; // asc || desc
    sortField: string;
    pageNumber: number;
    pageSize: number;

    // constructor overrides
    constructor(_filter: any,
                _sortOrder: string = 'asc',
                _sortField: string = '',
                _pageNumber: number = 0,
                _pageSize: number = 10) {
        this.filter = _filter;
        this.sortOrder = _sortOrder;
        this.sortField = _sortField;
        this.pageNumber = _pageNumber;
        this.pageSize = _pageSize;
    }
}
