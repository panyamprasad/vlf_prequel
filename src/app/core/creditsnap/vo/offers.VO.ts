/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: offers.VO.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {OfferOptionsVO} from './offerOptions.VO';

export class OffersVO {

    /* offerOptions: any = {
         offerId: 0,
         maxAvailableCredit: 0,
         customizedLoanAmount:0,
         terms: [{term: 0, achOptionAvailable: false}]
         termOptions: {min: 0, max: 0, step: 12, terms: [{term: 0, achOptionAvailable: false}]},
         aprOptions: {min: 0, max: 0, step: 0},
         paymentOptions: {min: 0, max: 0, step: 0},
         loanAmtOptions: {min: 0, max: 0, step: 500},
         selectedOffer: {
             offerId: 0, variationId: 0, uptoAmt: 0, term: 0, apr: 0, payment: 0,
             ach: false, achOptionAvailable: false, achMessage: "", achDiscount: 0,
             isCalcSuccess: true, totalInterest: 0, totalAmount: 0, selected: false
         },
         availableVariations: []
     };*/
    offers: OfferOptionsVO[] = [];
    loanAmtRange: any = {};
    aprRange: any = {};
    termRange: any = {};
}
