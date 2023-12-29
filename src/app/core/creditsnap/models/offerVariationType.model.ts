import {OfferVariationModel} from '@service/models/offerVariation.model';
import {OfferOptionsVO} from '@service/vo';
import {LoanAmountVariationsModel} from '@service/models/loan-amount.model';

export class OfferVariationTypeModel {
    fixed: {
        offerOptions: OfferOptionsVO;
        customOptions: OfferOptionsVO;
        customerOffers: OfferVariationModel[];
        loanAmountVariations: LoanAmountVariationsModel;
        multipleTerms: boolean;
    };
    variable: {
        offerOptions: OfferOptionsVO,
        customOptions: OfferOptionsVO,
        customerOffers: OfferVariationModel[],
        loanAmountVariations: LoanAmountVariationsModel;
        multipleTerms: boolean;
    }

    constructor() {
        this.fixed = {
            offerOptions: new OfferOptionsVO(),
            customOptions: new OfferOptionsVO(),
            customerOffers: [],
            loanAmountVariations: new LoanAmountVariationsModel(),
            multipleTerms: false
        };
        this.variable = {
            offerOptions: new OfferOptionsVO(),
            customOptions: new OfferOptionsVO(),
            customerOffers: [],
            loanAmountVariations: new LoanAmountVariationsModel(),
            multipleTerms: false
        };
    }

}
