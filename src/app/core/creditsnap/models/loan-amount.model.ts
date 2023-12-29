import {OfferModel} from '@service/models/offer.model';
import {OfferVariationModel} from '@service/models/offerVariation.model';
import {CollateralModel} from '@service/models/collateral.model';
import {AppConfigService} from '@service/config/app-config.service';

export class LoanAmountVariationsModel {
    payOffAmount: number = 9999999;
    customizedLoanAmount: number = 9999999;
    purchaseTransactionAverageAmount: number = AppConfigService.config.defaultLoanAmount || 22500;
    offerCustomizedFromCards: boolean = false;
    isVehicleValuationCompleted: boolean = false;
    hasCustomerOptedOffer: boolean = false;
    previouslySelectedOffer: OfferModel;
    previouslySelectedOfferVariation: OfferVariationModel;
    collateral: CollateralModel;
    loanPurposeConfig: any;
    totalTax: number = 0;
    selectedTerm = 0;
}
