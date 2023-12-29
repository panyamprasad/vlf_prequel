/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: tradeline.VO.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {TradelineModel} from '../models';

export class TradelineVO {
    tradeId: number;
    remainingPaymentTerm: number; // This is balance terms
    remainingTerms: number; // terms to be paid by cutomer
    calcMonthlyPayment: number;
    apr: number;
    term: number;
    loanAmount: number;
    totalAmount: number;
    totalInterest: number;
    // Used to capture the input from customer
    payOffAmount: number;
    currentMonthlyPayment: number;
    trade: TradelineModel;

    constructor() {
        this.trade = new TradelineModel();
    }
}
