import {OfferVariationModel} from './offerVariation.model';
import {LenderModel} from './lender.model';

export class OfferModel {
    applicationId: number;
    offerId: number;
    offerCode: string;
    offerDate: Date;
    expireDate: Date;
    // Lender max and Min loan amounts for the selected profile
    maxAvailableCredit: number;
    maxLTVAvailableCredit: number = 0;
    minAvailableCredit: number;
    offerType: string; // 1 - Pre-Approval, 0 - Pre-qualification
    relevancyScore: number;  // Generated based on the customer profile, Lender approval rate
    // Map with the Offer statues and short name
    status: string;   // GENERATED, ACCEPTED, DECLINED
    statusShortName: string;
    // Always we get the ACH discount with these parameters
    achDiscountRate: number;  // basis points
    isLenderOfferAch: boolean;   // True - ACH, False - Non ACH
    // With this flag, use the vehicle price from the collateral
    valueType: string;   // retailValue, tradeInValue, msrpValue
    collateralValue: number;
    loanPurpose: string;
    lender: LenderModel;

    // these are updated only after selecting the variation
    selectedTerm: number;
    selectedApr: number;
    selectedEmi: number;
    isAchSelected: boolean;
    customizedLoanAmount: number;
    isLenderOfferOnlineRates: boolean = true;
    isOfferSelected: boolean;
    stipulations: string;  // not going to be used, however may be updated through back-office
    variation: OfferVariationModel[];
    recommendations: OfferVariationModel[];

    constructor() {
        this.variation = [];
    }
}
