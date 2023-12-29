import {OfferVariationModel} from '@service/models/offerVariation.model';
import {OfferModel} from '@service/models/offer.model';
import {LoanAmountVariationsModel} from '@service/models/loan-amount.model';

export class LenderOfferModel {

    applicationId: number;
    offerId: number;
    offerVariationId: number;
    offerCategoryCode: string;  // P - Lowest Payment, I - Lowest interest, A - Lowest APR
    customizedLoanAmount: number;
    tempLoanAmount: number;
    selectedTerm: number;
    optedAch: boolean;
    apr: number;
    monthlyPayment: number;
    withAllAPR: number;
    expireDate: Date;
    status: string;
    statusShortName: string;
    relevancyScore: number;  // Generated based on the customer profile, Lender approval rate
    isLenderOfferAch: boolean;
    isOfferSelected: boolean;
    hasQualifiedRates: boolean;
    loanAmountChanged: boolean;
    selectedVariation: OfferVariationModel;
    terms: any = [];
    loanAmtOptions: any = {min: 1000000, max: 0, step: 500};
    termRanges: any = {min: 1000, max: 0, step: 12};
    aprRanges: any = {min: 1000, max: 0, step: .25};
    paymentRanges: any = {min: 10000, max: 0, step: 10};

    offers: OfferModel[];
    variations: OfferVariationModel[];
    recommendations: OfferVariationModel[];
    loanAmountVariations: LoanAmountVariationsModel;

    constructor() {
        this.variations = [];
        this.recommendations = [];
        this.offers = [];
        this.loanAmountVariations = new LoanAmountVariationsModel();
    }
}
