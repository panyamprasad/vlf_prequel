/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: bankaccount.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

export class BankAccountModel {
    id: number;
    routing: string;
    account: string;
    accountHolderName: string;
    accountType: number;  // 0 - Checking, 1 - Savings
    institution: string;
    institutionCity: string;
    postalCode: string;

    clear() {
        this.routing = '';
        this.accountHolderName = '';
        this.account = '';
        this.accountType = 0;
    }
}
