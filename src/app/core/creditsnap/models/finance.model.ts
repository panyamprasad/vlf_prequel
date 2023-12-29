/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: finance.model.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {BankAccountModel} from './bankaccount.model';


export class FinanceModel {
    id: number;
    offerId: number;
    offerVariationId: number;
    lenderId: number;
    amountFinance: number;
    downPayment: number;
    netTradeIn: number;
    financedFees: number;
    salesPrice: number;
    monthlyCharges: number;
    interestRate: number;
    apr: number;
    term: number;  // in months
    frequency: string; // Monthly, Bi-Monthly
    totalFinanceAmt: number;
    totalMonthlyPayment: number;
    gap: number;
    paymentDay: number;
    firstPaymentDate: Date;
    isAutoPayment: Boolean; // False - ACH not selected, True - ACH selected
    isLTVOverride: Boolean; // False - Not override, True - override
    dti: number;
    ltv: number;
    rePaycustBankAccount: BankAccountModel;
    fundingAccount: BankAccountModel;
    relevancyScore: number;
    lenderName: string;
    valuationType: string;

    constructor() {
        this.rePaycustBankAccount = new BankAccountModel();
        this.fundingAccount = new BankAccountModel();
    }

    clear() {
        this.amountFinance = 0;
        this.downPayment = 0;
        this.financedFees = 0;
        this.netTradeIn = 0;
        this.salesPrice = 0;
        this.monthlyCharges = 0;
        this.interestRate = 0;
        this.apr = 0;
        this.term = 0;
        this.dti = 0;
        this.ltv = 0;
        this.frequency = '';
        this.totalMonthlyPayment = 0;
        this.paymentDay = 1;
        this.firstPaymentDate = new Date();
        this.isAutoPayment = false;
        this.isLTVOverride = false;
        this.fundingAccount = new BankAccountModel();
        this.rePaycustBankAccount = new BankAccountModel();
    }
}
