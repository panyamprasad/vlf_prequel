import {LoanAmountVariationsModel, OfferVariationModel} from '@service/models';
import {TradelineVO} from '@service/vo/tradeline.VO';

export class OfferRecommendationModel {
    fixed: OfferVariationModel[];
    variable: OfferVariationModel[];
    constructor() {
        this.fixed = [];
        this.variable = [];
    }
}

export class OfferOptionsVO {
    applicationId: number;
    offerId: number;
    offerVariationId: number;
    offerCategoryCode: string;  // P - Lowest Payment, I - Lowest interest, A - Lowest APR
    customizedLoanAmount: number;
    tempLoanAmount: number;
    monthlyPayment: number;
    selectedTerm: number;
    selectedRateType: string;
    optedAch: boolean;
    apr: number;
    withAllAPR: number;
    expireDate: Date;
    status: string;
    statusShortName: string;
    relevancyScore: number;  // Generated based on the customer profile, Lender approval rate
    isLenderOfferAch: boolean;
    isOfferSelected: boolean;
    selectedVariation: OfferVariationModel;
    loanAmountVariations: LoanAmountVariationsModel;
    hasQualifiedRates: boolean;
    loanAmountChanged: boolean;
    loanAmtOptions: any = {};
    terms: any = [];
    variations: OfferVariationModel[];
    recommendations: OfferRecommendationModel;
    tradeLine: TradelineVO;
    generatedOffers: OfferVariationModel[];
    fixedOffers: OfferVariationModel[];
    variableOffers: OfferVariationModel[];
    maxLoanAmountForAllVariations: number;
    minLoanAmountForAllVariations: number;
    constructor() {
        this.terms = [];
        this.variations = [];
        this.selectedVariation = new OfferVariationModel();
        this.loanAmountVariations = new LoanAmountVariationsModel();
        this.loanAmtOptions = {};
        this.recommendations = new OfferRecommendationModel();
        this.tradeLine = new TradelineVO();
        this.isOfferSelected = false;
        this.maxLoanAmountForAllVariations = 0;
        this.minLoanAmountForAllVariations = 999999;
    }
}
