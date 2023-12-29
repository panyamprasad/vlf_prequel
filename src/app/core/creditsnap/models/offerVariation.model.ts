import {LenderModel} from '@service/models/lender.model';

export class OfferVariationModel {
    applicationId: number;
    offerId: number;
    offerVariationId: number;
    offerCode: string;
    offerDate: Date;
    expireDate: Date;
    status: string;
    statusShortName: string;
    institution: string;
    lender: LenderModel;
    product: string;
    loanPurpose: string;
    relevancyScore: number;
    offerStatus: string;
    isLenderOfferAch: boolean;
    achDiscountRate: number;
    discountedPrice: number;
    valueType: string;
    defaultTerm: number;
    minTerm: number;
    maxTerm: number;
    apr: number;
    achApr: number;    // Used for the UI calculations
    maxAvailableCredit: number;
    maxLTVLoanAmount: number;
    minLTVLoanAmount: number;
    minAvailableCredit: number;
    customizedLoanAmount: number;
    maxLTVAvailableCredit: number;
    minLTVAvailableCredit: number;
    maxAvailableAmount: number; // for frontend use only
    minAvailableAmount: number; // for frontend use only
    withAllAPR: number;
    emi: number;
    maxDtiEmi: number;
    minDtiEmi: number;
    preDTI: number;
    postDTI: number;
    maxDTI: number;
    minDTI: number;
    salary: number;
    maxDTILoanAmount: number;
    optedAch: boolean;
    isVariationSelected: boolean;  // false - Not selected , true = Selected
    isOfferSelected: boolean;
    isLenderOfferOnlineRates: boolean = true;
    minLtv: number;
    maxLtv: number;
    collateralValue: number;
    backendLtvMax: number; // Use this if ancillary products are selected
    minLoanAmount: number;
    maxLoanAmount: number;
    totalInterest: number;
    totalTax: number;
    totalAmount: number;
    isCalcSuccess: boolean = true;
    achMessage: string = '';
    offerCategory: string;
    offerCategoryCode: string;
    selectedPriorLTV: boolean;
    payOffAmount: number;
    downPayment: number;
    hasDownPaymentRequired: boolean;
    interestSaving: number;
    aprSaving: number;
    selectedApr: number;
    selectedEmi: number;
    rateType: string;
    maxLoanAmountCalculationDone: boolean;
    constructor() {
        this.apr = 0;
        this.emi = 0;
        this.totalTax = 0;
        this.totalInterest = 0;
        this.isVariationSelected = false;
        this.selectedPriorLTV = false;
        this.maxDTILoanAmount = 0;
        this.lender = new LenderModel();
        this.maxLoanAmountCalculationDone = false;
    }
}
