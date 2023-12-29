import {OfferVariationModel} from './offerVariation.model';
import {LenderModel} from './lender.model';

export class OfferNewSubmitModel {
    
    applicationId: number;
    applicantId: number;
    offerRateLookUpId: number;
    status: string;
    loanAmount: number;
    intrestRatePercentage: number;
    term: number;
    closingCostPercentage: number;
    apr: number;
    closingCost: number ;
    monthlyPayment: number;
    activityStatus: string;

    constructor() {
       
    }
}
