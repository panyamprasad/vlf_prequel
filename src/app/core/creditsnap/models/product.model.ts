/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: product.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class ProductModel {
    id: number;
    fullName: string;
    shortName: string;
    accountType: string;  // Consumer, Business
    category: string; // eProduct, Indirect
    productType: string;    // Auto, Personal, HELOC
    loanPurpose: string;
    description: string;
    effectiveDate: Date;
    expirationDate: Date;
    productStatus: Boolean;  // True - Active , False - Inactive
    minTerm: number;
    maxTerm: number;
    defaultTerm: number;
    maxDaysFor1stPayment: number;

    clear() {
        this.productType = '';
        this.loanPurpose = '';
        this.loanPurpose = '';
    }
}
